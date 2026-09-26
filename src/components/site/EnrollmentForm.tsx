import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { ClipboardCheck, GraduationCap, UserRound, Users } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { SelectField, SuccessDialog, TextField } from "./FormControls";
import { matriculaService } from "@/services/matriculaService";
import { useSecciones } from "@/hooks/useSecciones";
import { useCatalogosForm } from "@/hooks/useCatalogosForm";

const EMPTY = {
  nombres: "", apPaterno: "", apMaterno: "", dni: "", nacimiento: "",
  celular: "", correo: "", nivel: "", grado: "", servicio: "", turno: "",
  apoNombre: "", apoDni: "", apoCelular: "", apoCorreo: "",
};

type Values = typeof EMPTY;
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DNI_REGEX = /^\d{8}$/;
const CELULAR_REGEX = /^\d{9}$/;

const requerido = (valor: string, mensaje = "Este campo es obligatorio.") =>
  valor.trim() ? undefined : mensaje;

function validarFormulario(values: Values): Errors {
  const errors: Errors = {};

  errors.nombres = requerido(values.nombres);
  errors.apPaterno = requerido(values.apPaterno);
  errors.apMaterno = requerido(values.apMaterno);
  errors.nacimiento = requerido(values.nacimiento, "Selecciona la fecha de nacimiento.");
  errors.nivel = requerido(values.nivel, "Selecciona el nivel educativo.");
  errors.grado = requerido(values.grado, "Selecciona el grado o modalidad.");
  errors.servicio = requerido(values.servicio, "Selecciona un servicio.");
  errors.turno = requerido(values.turno, "Selecciona un turno.");
  errors.apoNombre = requerido(values.apoNombre);

  if (!DNI_REGEX.test(values.dni.trim()))
    errors.dni = "El DNI debe tener 8 dígitos.";

  if (!CELULAR_REGEX.test(values.celular.trim()))
    errors.celular = "El celular debe tener 9 dígitos.";

  if (!EMAIL_REGEX.test(values.correo.trim()))
    errors.correo = "Ingresa un correo válido.";

  if (!DNI_REGEX.test(values.apoDni.trim()))
    errors.apoDni = "El DNI debe tener 8 dígitos.";

  if (!CELULAR_REGEX.test(values.apoCelular.trim()))
    errors.apoCelular = "El celular debe tener 9 dígitos.";

  if (values.apoCorreo.trim() && !EMAIL_REGEX.test(values.apoCorreo.trim()))
    errors.apoCorreo = "Ingresa un correo válido.";

  Object.keys(errors).forEach((key) => {
    if (errors[key as keyof Values] === undefined)
      delete errors[key as keyof Values];
  });

  return errors;
}

type BlockProps = {
  icon: typeof UserRound;
  step: string;
  title: string;
  children: ReactNode;
};

function Block({ icon: Icon, step, title, children }: BlockProps) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand text-primary-foreground">
          <Icon className="size-5" />
        </span>

        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-crimson">
            Paso {step}
          </p>
          <h3 className="text-lg text-navy">{title}</h3>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  );
}

export function EnrollmentForm() {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const {
    matriculaNiveles,
    matriculaGrados,
    matriculaServicios,
    matriculaTurnos,
  } = useCatalogosForm();

  const { getSeccion, isHidden } = useSecciones();
  const seccion = getSeccion("PRE-MATRÍCULA");

  useEffect(() => {
    setValues((actual) => ({
      ...actual,
      nivel: matriculaNiveles.includes(actual.nivel) ? actual.nivel : "",
      grado: matriculaGrados.includes(actual.grado) ? actual.grado : "",
      servicio: matriculaServicios.includes(actual.servicio) ? actual.servicio : "",
      turno: matriculaTurnos.includes(actual.turno) ? actual.turno : "",
    }));
  }, [
    matriculaNiveles,
    matriculaGrados,
    matriculaServicios,
    matriculaTurnos,
  ]);

  const actualizar = (campo: keyof Values) =>
    (event: { target: { value: string } }) => {
      setValues((actual) => ({ ...actual, [campo]: event.target.value }));
      setErrors((actual) => ({ ...actual, [campo]: undefined }));
    };

  const enviar = async (event: FormEvent) => {
    event.preventDefault();

    const errores = validarFormulario(values);
    setErrors(errores);

    if (Object.keys(errores).length > 0) return;

    try {
      setSending(true);

      await matriculaService.crearSolicitud({
        est_nombres: values.nombres,
        est_apellido_paterno: values.apPaterno,
        est_apellido_materno: values.apMaterno,
        est_dni: values.dni,
        est_fecha_nacimiento: values.nacimiento,
        est_celular: values.celular,
        est_correo: values.correo,
        nivel_educativo: values.nivel,
        grado_modalidad: values.grado,
        servicio_contratar: values.servicio,
        turno_preferido: values.turno,
        apod_nombre_completo: values.apoNombre,
        apod_dni: values.apoDni,
        apod_celular: values.apoCelular,
        apod_correo: values.apoCorreo,
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

  if (isHidden("PRE-MATRÍCULA")) return null;

  return (
    <section id="matricula" className="bg-secondary/60 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={seccion?.etiqueta ?? "Pre-matrícula"}
          title={seccion?.titulo ?? "Inicia tu matrícula"}
          subtitle={
            seccion?.descripcion ??
            "Registra tus datos y nuestro equipo te contactará para confirmar la información y darte los siguientes pasos. No se realiza ningún pago en línea."
          }
        />

        <form onSubmit={enviar} noValidate className="mt-12 space-y-6">
          <Reveal>
            <Block icon={UserRound} step="1" title="Datos del estudiante">
              <TextField label="Nombres" required maxLength={60}
                value={values.nombres} onChange={actualizar("nombres")} error={errors.nombres} />

              <TextField label="Apellido paterno" required maxLength={60}
                value={values.apPaterno} onChange={actualizar("apPaterno")} error={errors.apPaterno} />

              <TextField label="Apellido materno" required maxLength={60}
                value={values.apMaterno} onChange={actualizar("apMaterno")} error={errors.apMaterno} />

              <TextField label="DNI" required inputMode="numeric" maxLength={8}
                value={values.dni} onChange={actualizar("dni")} error={errors.dni} placeholder="12345678" />

              <TextField label="Fecha de nacimiento" required type="date"
                value={values.nacimiento} onChange={actualizar("nacimiento")} error={errors.nacimiento} />

              <TextField label="Celular" required inputMode="numeric" maxLength={9}
                value={values.celular} onChange={actualizar("celular")} error={errors.celular} placeholder="9XXXXXXXX" />

              <div className="sm:col-span-2">
                <TextField label="Correo electrónico" required type="email" maxLength={255}
                  value={values.correo} onChange={actualizar("correo")} error={errors.correo}
                  placeholder="estudiante@gmail.com" />
              </div>
            </Block>
          </Reveal>

          <Reveal delay={80}>
            <Block icon={GraduationCap} step="2" title="Información académica">
              <SelectField label="Nivel educativo" required options={matriculaNiveles}
                value={values.nivel} onChange={actualizar("nivel")} error={errors.nivel} />

              <SelectField label="Grado / modalidad" required options={matriculaGrados}
                value={values.grado} onChange={actualizar("grado")} error={errors.grado} />

              <SelectField label="Servicio que desea contratar" required options={matriculaServicios}
                value={values.servicio} onChange={actualizar("servicio")} error={errors.servicio} />

              <SelectField label="Turno preferido" required options={matriculaTurnos}
                value={values.turno} onChange={actualizar("turno")} error={errors.turno} />
            </Block>
          </Reveal>

          <Reveal delay={140}>
            <Block icon={Users} step="3" title="Datos del padre o apoderado">
              <div className="sm:col-span-2">
                <TextField label="Nombre completo" required maxLength={120}
                  value={values.apoNombre} onChange={actualizar("apoNombre")} error={errors.apoNombre} />
              </div>

              <TextField label="DNI" required inputMode="numeric" maxLength={8}
                value={values.apoDni} onChange={actualizar("apoDni")} error={errors.apoDni} placeholder="12345678" />

              <TextField label="Celular" required inputMode="numeric" maxLength={9}
                value={values.apoCelular} onChange={actualizar("apoCelular")}
                error={errors.apoCelular} placeholder="9XXXXXXXX" />

              <div className="sm:col-span-2">
                <TextField label="Correo electrónico" type="email" maxLength={255}
                  value={values.apoCorreo} onChange={actualizar("apoCorreo")}
                  error={errors.apoCorreo} placeholder="apoderado@gmail.com" />
              </div>
            </Block>
          </Reveal>

          <button type="submit" disabled={sending}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-4 text-base font-extrabold text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5 disabled:opacity-70">
            <ClipboardCheck className="size-5" />
            {sending ? "Enviando..." : seccion?.texto_boton ?? "Enviar solicitud de matrícula"}
          </button>
        </form>
      </div>

      <SuccessDialog
        open={done}
        onOpenChange={setDone}
        title="¡Solicitud de matrícula recibida!"
        description="Nos comunicaremos contigo para confirmar los datos y brindarte los siguientes pasos."
      />
    </section>
  );
}