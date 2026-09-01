import { useEffect, useState } from "react";
import { Mail, MessageSquare, Phone, Send } from "lucide-react";
import { NIVELES, SERVICIOS, SITE } from "@/config/site";
import { Reveal } from "./Reveal";
import { SelectField, SuccessDialog, TextAreaField, TextField } from "./FormControls";
import type { InfoPreset } from "./forms.types";

const EMPTY = {
  nombres: "",
  dni: "",
  celular: "",
  correo: "",
  nivel: "",
  servicio: "",
  mensaje: "",
};

type Values = typeof EMPTY;
type Errors = { [K in keyof Values]?: string | undefined };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.nombres.trim().length < 3) e.nombres = "Ingresa tus nombres y apellidos.";
  else if (v.nombres.trim().length > 100) e.nombres = "Máximo 100 caracteres.";
  if (!/^\d{8}$/.test(v.dni.trim())) e.dni = "El DNI debe tener 8 dígitos.";
  if (!/^\d{9}$/.test(v.celular.trim())) e.celular = "El celular debe tener 9 dígitos.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.correo.trim())) e.correo = "Ingresa un correo válido.";
  if (!v.nivel) e.nivel = "Selecciona un nivel educativo.";
  if (!v.servicio) e.servicio = "Selecciona un servicio de interés.";
  if (v.mensaje.trim().length > 500) e.mensaje = "Máximo 500 caracteres.";
  return e;
}

export function InformationForm({ preset }: { preset: InfoPreset }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!preset.token) return;
    setValues((prev) => ({
      ...prev,
      nivel: preset.nivel ?? prev.nivel,
      servicio: preset.servicio ?? prev.servicio,
    }));
  }, [preset]);

  const set = (key: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSending(true);
    // Envío simulado (sin backend por ahora)
    window.setTimeout(() => {
      setSending(false);
      setDone(true);
      setValues(EMPTY);
    }, 700);
  };

  return (
    <section id="informacion" className="bg-background py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.35fr] lg:px-8">
        <Reveal>
          <span className="inline-block rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand">
            Informes
          </span>
          <h2 className="mt-4 text-3xl text-navy sm:text-4xl">¿Quieres más información?</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Déjanos tus datos y nos pondremos en contacto contigo.
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
                <p className="text-sm break-all text-muted-foreground">{SITE.email}</p>
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
          <form
            onSubmit={onSubmit}
            noValidate
            className="surface-card rounded-3xl border border-border/60 p-6 sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <TextField
                  label="Nombres y apellidos"
                  required
                  maxLength={100}
                  value={values.nombres}
                  onChange={set("nombres")}
                  error={errors.nombres}
                  placeholder="Ej. Ana Quispe Ramos"
                />
              </div>
              <TextField
                label="DNI"
                required
                inputMode="numeric"
                maxLength={8}
                value={values.dni}
                onChange={set("dni")}
                error={errors.dni}
                placeholder="12345678"
              />
              <TextField
                label="Celular"
                required
                inputMode="numeric"
                maxLength={9}
                value={values.celular}
                onChange={set("celular")}
                error={errors.celular}
                placeholder="9XXXXXXXX"
              />
              <div className="sm:col-span-2">
                <TextField
                  label="Correo electrónico"
                  required
                  type="email"
                  maxLength={255}
                  value={values.correo}
                  onChange={set("correo")}
                  error={errors.correo}
                  placeholder="tucorreo@gmail.com"
                />
              </div>
              <SelectField
                label="Nivel educativo"
                required
                options={NIVELES}
                value={values.nivel}
                onChange={set("nivel")}
                error={errors.nivel}
              />
              <SelectField
                label="Servicio de interés"
                required
                options={SERVICIOS}
                value={values.servicio}
                onChange={set("servicio")}
                error={errors.servicio}
              />
              <div className="sm:col-span-2">
                <TextAreaField
                  label="Mensaje"
                  maxLength={500}
                  value={values.mensaje}
                  onChange={set("mensaje")}
                  error={errors.mensaje}
                  placeholder="Cuéntanos qué necesitas..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-crimson px-6 py-3.5 text-base font-extrabold text-crimson-foreground shadow-card transition-transform hover:-translate-y-0.5 disabled:opacity-70"
            >
              <Send className="size-5" />
              {sending ? "Enviando..." : "Solicitar información"}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Al enviar aceptas que Triunfa Beca se comunique contigo para brindarte información.
            </p>
          </form>
        </Reveal>
      </div>

      <SuccessDialog
        open={done}
        onOpenChange={setDone}
        title="¡Solicitud enviada!"
        description="Gracias por comunicarte con Triunfa Beca. Pronto nos pondremos en contacto contigo."
      />
    </section>
  );
}
