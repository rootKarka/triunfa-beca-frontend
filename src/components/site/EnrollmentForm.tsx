import { useState } from "react";
import { ClipboardCheck, GraduationCap, UserRound, Users } from "lucide-react";
import { NIVELES, SERVICIOS } from "@/config/site";
import { Reveal, SectionHeading } from "./Reveal";
import { SelectField, SuccessDialog, TextField } from "./FormControls";

const GRADOS = [
  "3 años",
  "4 años",
  "5 años",
  "1° grado",
  "2° grado",
  "3° grado",
  "4° grado",
  "5° grado",
  "6° grado",
  "1° secundaria",
  "2° secundaria",
  "3° secundaria",
  "4° secundaria",
  "5° secundaria",
  "Preuniversitario - Ciclo regular",
  "Preuniversitario - Beca 18",
];

const TURNOS = ["Turno Mañana (8:30 AM - 12:00 PM)", "Turno Tarde (3:00 PM - 6:00 PM)"];

const EMPTY = {
  nombres: "",
  apPaterno: "",
  apMaterno: "",
  dni: "",
  nacimiento: "",
  celular: "",
  correo: "",
  nivel: "",
  grado: "",
  servicio: "",
  turno: "",
  apoNombre: "",
  apoDni: "",
  apoCelular: "",
  apoCorreo: "",
};

type Values = typeof EMPTY;
type Errors = Partial<Record<keyof Values, string>>;

const req = (v: string, msg = "Este campo es obligatorio.") => (v.trim() ? undefined : msg);

function validate(v: Values): Errors {
  const e: Errors = {};
  e.nombres = req(v.nombres);
  e.apPaterno = req(v.apPaterno);
  e.apMaterno = req(v.apMaterno);
  e.dni = /^\d{8}$/.test(v.dni.trim()) ? undefined : "El DNI debe tener 8 dígitos.";
  e.nacimiento = req(v.nacimiento, "Selecciona la fecha de nacimiento.");
  e.celular = /^\d{9}$/.test(v.celular.trim()) ? undefined : "El celular debe tener 9 dígitos.";
  e.correo = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.correo.trim()) ? undefined : "Ingresa un correo válido.";
  e.nivel = req(v.nivel, "Selecciona el nivel educativo.");
  e.grado = req(v.grado, "Selecciona el grado o modalidad.");
  e.servicio = req(v.servicio, "Selecciona un servicio.");
  e.turno = req(v.turno, "Selecciona un turno.");
  e.apoNombre = req(v.apoNombre);
  e.apoDni = /^\d{8}$/.test(v.apoDni.trim()) ? undefined : "El DNI debe tener 8 dígitos.";
  e.apoCelular = /^\d{9}$/.test(v.apoCelular.trim()) ? undefined : "El celular debe tener 9 dígitos.";
  e.apoCorreo = !v.apoCorreo.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.apoCorreo.trim())
    ? undefined
    : "Ingresa un correo válido.";
  (Object.keys(e) as (keyof Values)[]).forEach((k) => e[k] === undefined && delete e[k]);
  return e;
}

function Block({
  icon: Icon,
  step,
  title,
  children,
}: {
  icon: typeof UserRound;
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-soft sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-brand text-primary-foreground">
          <Icon className="size-5" />
        </span>
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-crimson">Paso {step}</p>
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

  const set = (key: keyof Values) => (e: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      document.querySelector("#matricula")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setDone(true);
      setValues(EMPTY);
    }, 700);
  };

  return (
    <section id="matricula" className="bg-secondary/60 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Pre-matrícula"
          title="Inicia tu matrícula"
          subtitle="Registra tus datos y nuestro equipo te contactará para confirmar la información y darte los siguientes pasos. No se realiza ningún pago en línea."
        />

        <form onSubmit={onSubmit} noValidate className="mt-12 space-y-6">
          <Reveal>
            <Block icon={UserRound} step="1" title="Datos del estudiante">
              <TextField label="Nombres" required value={values.nombres} onChange={set("nombres")} error={errors.nombres} maxLength={60} />
              <TextField label="Apellido paterno" required value={values.apPaterno} onChange={set("apPaterno")} error={errors.apPaterno} maxLength={60} />
              <TextField label="Apellido materno" required value={values.apMaterno} onChange={set("apMaterno")} error={errors.apMaterno} maxLength={60} />
              <TextField label="DNI" required inputMode="numeric" maxLength={8} value={values.dni} onChange={set("dni")} error={errors.dni} placeholder="12345678" />
              <TextField label="Fecha de nacimiento" required type="date" value={values.nacimiento} onChange={set("nacimiento")} error={errors.nacimiento} />
              <TextField label="Celular" required inputMode="numeric" maxLength={9} value={values.celular} onChange={set("celular")} error={errors.celular} placeholder="9XXXXXXXX" />
              <div className="sm:col-span-2">
                <TextField label="Correo electrónico" required type="email" maxLength={255} value={values.correo} onChange={set("correo")} error={errors.correo} placeholder="estudiante@gmail.com" />
              </div>
            </Block>
          </Reveal>

          <Reveal delay={80}>
            <Block icon={GraduationCap} step="2" title="Información académica">
              <SelectField label="Nivel educativo" required options={NIVELES} value={values.nivel} onChange={set("nivel")} error={errors.nivel} />
              <SelectField label="Grado / modalidad" required options={GRADOS} value={values.grado} onChange={set("grado")} error={errors.grado} />
              <SelectField label="Servicio que desea contratar" required options={SERVICIOS} value={values.servicio} onChange={set("servicio")} error={errors.servicio} />
              <SelectField label="Turno preferido" required options={TURNOS} value={values.turno} onChange={set("turno")} error={errors.turno} />
            </Block>
          </Reveal>

          <Reveal delay={140}>
            <Block icon={Users} step="3" title="Datos del padre o apoderado">
              <div className="sm:col-span-2">
                <TextField label="Nombre completo" required maxLength={120} value={values.apoNombre} onChange={set("apoNombre")} error={errors.apoNombre} />
              </div>
              <TextField label="DNI" required inputMode="numeric" maxLength={8} value={values.apoDni} onChange={set("apoDni")} error={errors.apoDni} placeholder="12345678" />
              <TextField label="Celular" required inputMode="numeric" maxLength={9} value={values.apoCelular} onChange={set("apoCelular")} error={errors.apoCelular} placeholder="9XXXXXXXX" />
              <div className="sm:col-span-2">
                <TextField label="Correo electrónico" type="email" maxLength={255} value={values.apoCorreo} onChange={set("apoCorreo")} error={errors.apoCorreo} placeholder="apoderado@gmail.com" />
              </div>
            </Block>
          </Reveal>

          <button
            type="submit"
            disabled={sending}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gold-gradient px-6 py-4 text-base font-extrabold text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5 disabled:opacity-70"
          >
            <ClipboardCheck className="size-5" />
            {sending ? "Enviando..." : "Enviar solicitud de matrícula"}
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
