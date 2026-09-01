import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-triunfa-beca.png";
import { NAV_LINKS, scrollToSection } from "@/config/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToSection(href);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-background/95 shadow-soft backdrop-blur" : "bg-background/80 backdrop-blur",
      )}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          onClick={() => go("#inicio")}
          className="flex items-center gap-2 transition-transform hover:scale-[1.02]"
          aria-label="Ir al inicio"
        >
          <img src={logo} alt="Logo de Triunfa Beca" width={889} height={466} className="h-11 w-auto" />
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => go(link.href)}
                className="rounded-full px-4 py-2 text-sm font-semibold text-navy/80 transition-colors hover:bg-accent hover:text-brand"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => go("#matricula")}
            className="hidden rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-extrabold text-gold-foreground shadow-gold transition-transform hover:-translate-y-0.5 sm:block"
          >
            Quiero matricularme
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="rounded-xl border border-border p-2 text-navy transition-colors hover:bg-accent lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <ul className="space-y-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => go(link.href)}
                className="w-full rounded-xl px-4 py-3 text-left text-base font-semibold text-navy transition-colors hover:bg-accent"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => go("#matricula")}
              className="mt-2 w-full rounded-xl bg-gold-gradient px-4 py-3 text-base font-extrabold text-gold-foreground"
            >
              Quiero matricularme
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}
