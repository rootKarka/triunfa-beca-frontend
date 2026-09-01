import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const baseField =
  "w-full rounded-xl border-2 border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-brand";

function Wrapper({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string | undefined;
  required?: boolean | undefined;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-bold text-navy">
        {label} {required ? <span className="text-crimson">*</span> : null}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-crimson">
          <AlertCircle className="size-3.5" /> {error}
        </span>
      ) : null}
    </label>
  );
}

export function TextField({
  label,
  error,
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string | undefined }) {
  return (
    <Wrapper label={label} error={error} required={props.required}>
      <input {...props} className={cn(baseField, error && "border-crimson", className)} />
    </Wrapper>
  );
}

export function SelectField({
  label,
  error,
  options,
  placeholder = "Selecciona una opción",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string | undefined;
  options: readonly string[];
  placeholder?: string | undefined;
}) {
  return (
    <Wrapper label={label} error={error} required={props.required}>
      <select {...props} className={cn(baseField, "appearance-none", error && "border-crimson")}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function TextAreaField({
  label,
  error,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string | undefined }) {
  return (
    <Wrapper label={label} error={error} required={props.required}>
      <textarea rows={4} {...props} className={cn(baseField, "resize-none", error && "border-crimson")} />
    </Wrapper>
  );
}

export function SuccessDialog({
  open,
  onOpenChange,
  title,
  description,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl text-center">
        <DialogHeader className="items-center">
          <span className="mb-2 inline-flex size-16 items-center justify-center rounded-full bg-whatsapp/15">
            <CheckCircle2 className="size-9 text-whatsapp" />
          </span>
          <DialogTitle className="text-center font-display text-2xl text-navy">{title}</DialogTitle>
          <DialogDescription className="text-center text-sm leading-relaxed text-muted-foreground">
            {description}
          </DialogDescription>
        </DialogHeader>
        <button
          onClick={() => onOpenChange(false)}
          className="mx-auto mt-2 rounded-full bg-brand px-6 py-2.5 text-sm font-extrabold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Entendido
        </button>
      </DialogContent>
    </Dialog>
  );
}
