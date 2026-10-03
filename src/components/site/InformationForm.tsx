import { useEffect, useState, type FormEvent } from "react";
import { Mail, MessageSquare, Phone, Send } from "lucide-react";
import { SITE } from "@/config/site";
import { Reveal } from "./Reveal";
import { SelectField, SuccessDialog, TextAreaField, TextField } from "./FormControls";
import type { InfoPreset } from "./forms.types";
import { informacionService } from "@/services/informacionService";
import { useSecciones } from "@/hooks/useSecciones";
import { useCatalogosForm } from "@/hooks/useCatalogosForm";

const EMPTY = {
  nombres: "", dni: "", celular: "", correo: "",
  nivel: "", servicio: "", mensaje: "",
};

type Values = typeof EMPTY;
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DNI_REGEX = /^\d{8}$/;
const CELULAR_REGEX = /^\d{9}$/;

function validate(values: Values, niveles: string[], servicios: string[]): Errors {
  const errors: Errors = {};
  const nombres = values.nombres.trim();

  if (nombres.length < 3) errors.nombres = "Ingresa tus nombres y apellidos.";
  else if (nombres.length > 100) errors.nombres = "Máximo 100 caracteres.";

  if (!DNI_REGEX.test(values.dni.trim()))
    errors.dni = "El DNI debe tener 8 dígitos.";

  if (!CELULAR_REGEX.test(values.celular.trim()))
    errors.celular = "El celular debe tener 9 dígitos.";

  if (!EMAIL_REGEX.test(values.correo.trim()))
    errors.correo = "Ingresa un correo válido.";

  if (!values.nivel || !niveles.includes(values.nivel))
    errors.nivel = "Selecciona un nivel educativo.";

  if (!values.servicio || !servicios.includes(values.servicio))
    errors.servicio = "Selecciona un servicio de interés.";

  if (values.mensaje.trim().length > 500)
    errors.mensaje = "Máximo 500 caracteres.";

  return errors;
}

export function InformationForm({ preset }: { preset: InfoPreset }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const { infoNiveles, infoServicios } = useCatalogosForm();
  const { getSeccion, isHidden } = useSecciones();
  const seccion = getSeccion("INFORMES");

  useEffect(() => {
    if (!preset.token) return;

    setValues((prev) => ({
      ...prev,
      nivel: preset.nivel ?? prev.nivel,
      servicio: preset.servicio ?? prev.servicio,
    }));
  }, [preset.token, preset.nivel, preset.servicio]);

  const actualizar = (campo: keyof Values) =>
    (event: { target: { value: string } }) => {
      setValues((prev) => ({ ...prev, [campo]: event.target.value }));
      setErrors((prev) => ({ ...prev, [campo]: undefined }));
    };

  const enviar = async (event: FormEvent) => {
    event.preventDefault();

    const found = validate(values, infoNiveles, infoServicios);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    try {
      setSending(true);

      await informacionService.crearSolicitud({
        nombres_apellidos: values.nombres,
        dni: values.dni,
        celular: values.celular,
        correo: values.correo,
        nivel_educativo: values.nivel,
        servicio_interes: values.servicio,
        mensaje: values.mensaje,
        canal_preferido: "WhatsApp",
      });

      setValues(EMPTY);
      setDone(true);
    } catch (error) {
      console.error("Error al enviar solicitud", error);

      alert(
        error instanceof Error
          ? error.message
          : "Hubo un error al enviar tu solicitud. Intenta nuevamente."
      );
    } finally {
      setSending(false);
    }
  };

  if (isHidden("INFORMES")) return null;

  return (
    <section id="informacion" className="bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.35fr] lg:px-8">
        <Reveal>
          <span className="inline-block rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand">
            {seccion?.etiqueta ?? "Informes"}
          </span>

          <h2 className="mt-4 text-3xl text-navy sm:text-4xl">
            {seccion?.titulo ?? "¿Quieres más información?"}
          </h2>

          <p className="mt-3 text-base text-muted-foreground">
            {seccion?.descripcion ?? "Déjanos tus datos y nos pondremos en contacto contigo."}
          </p>

          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
              <Phone className="size-5 text-crimson" />
              <div>
                <p className="text-sm font-bold text-navy">Informes</p>
                <p className="text-sm text-muted-foreground">{SITE.phoneDisplay}</p>
              </div>
            </li>

            <li className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
              <Mail className="size-5 text-brand" />
              <div>
                <p className="text-sm font-bold text-navy">Correo</p>
                <p className="break-all text-sm text-muted-foreground">{SITE.email}</p>
              </div>
            </li>

            <li className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-soft">
              <MessageSquare className="size-5 text-whatsapp" />
              <div>
                <p className="text-sm font-bold text-navy">Respuesta rápida</p>
                <p className="text-sm text-muted-foreground">Te escribimos por WhatsApp</p>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={enviar} noValidate
            className="surface-card rounded-3xl border border-border/60 p-6 sm:p-8">

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <TextField label="Nombres y apellidos" required maxLength={100}
                  value={values.nombres} onChange={actualizar("nombres")}
                  error={errors.nombres} placeholder="Ej. Ana Quispe Ramos" />
              </div>

              <TextField label="DNI" required inputMode="numeric" maxLength={8}
                value={values.dni} onChange={actualizar("dni")}
                error={errors.dni} placeholder="12345678" />

              <TextField label="Celular" required inputMode="numeric" maxLength={9}
                value={values.celular} onChange={actualizar("celular")}
                error={errors.celular} placeholder="9XXXXXXXX" />

              <div className="sm:col-span-2">
                <TextField label="Correo electrónico" required type="email" maxLength={255}
                  value={values.correo} onChange={actualizar("correo")}
                  error={errors.correo} placeholder="tucorreo@gmail.com" />
              </div>

              <SelectField label="Nivel educativo" required options={infoNiveles}
                value={values.nivel} onChange={actualizar("nivel")}
                error={errors.nivel} />

              <SelectField label="Servicio de interés" required options={infoServicios}
                value={values.servicio} onChange={actualizar("servicio")}
                error={errors.servicio} />

              <div className="sm:col-span-2">
                <TextAreaField label="Mensaje" maxLength={500}
                  value={values.mensaje} onChange={actualizar("mensaje")}
                  error={errors.mensaje} placeholder="Cuéntanos qué necesitas..." />
              </div>
            </div>

            <button type="submit" disabled={sending}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3.5 text-base font-extrabold text-crimson-foreground shadow-card transition-transform hover:-translate-y-0.5 disabled:opacity-70">
              <Send className="size-5" />
              {sending ? "Enviando..." : seccion?.texto_boton ?? "Solicitar información"}
            </button>

            <p className="mt-3 text-center text-xs text-muted-foreground">
              Al enviar aceptas que Triunfa Beca se comunique contigo para brindarte información.
            </p>
          </form>
        </Reveal>
      </div>

      <SuccessDialog open={done} onOpenChange={setDone}
        title="¡Solicitud enviada!"
        description="Gracias por comunicarte con Triunfa Beca. Pronto nos pondremos en contacto contigo." />
    </section>
  );
}