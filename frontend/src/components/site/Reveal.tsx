import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Animación suave de entrada al hacer scroll. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(shown ? "reveal-shown" : "reveal-hidden", className)}
    >
      {children}
    </div>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  inverted?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  inverted,
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn("mx-auto max-w-2xl text-center", className)}>
      {eyebrow ? (
        <span
          className={cn(
            "inline-block rounded-full px-4 py-1 text-xs font-bold uppercase tracking-widest",
            inverted ? "bg-gold text-gold-foreground" : "bg-accent text-brand",
          )}
        >
          {eyebrow}
        </span>
      ) : null}
      <h2
        className={cn(
          "mt-4 text-3xl leading-tight sm:text-4xl",
          inverted ? "text-navy-foreground" : "text-navy",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-3 text-base",
            inverted ? "text-navy-foreground/80" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
