/**
 * Configuración central de TRIUNFA BECA.
 * Modifica aquí los datos de contacto: se usan en toda la página.
 */
export const SITE = {
  name: "TRIUNFA BECA",
  tagline: "Educación que impulsa tus metas.",
  email: "triunfabeca@gmail.com",
  phoneDisplay: "947 377 284",
  /** Número en formato internacional, sin espacios ni símbolos (para WhatsApp) */
  whatsappNumber: "51947377284",
  whatsappMessage: "Hola, Triunfa Beca. Deseo obtener información sobre sus servicios.",
  address: "Nicolás Vela MZ. 77A LT.12",
  addressReference: "Frente al Parque de Pascual Alegre",
} as const;

export const whatsappLink = (message: string = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Niveles", href: "#niveles" },
  { label: "Beca 18", href: "#beca18" },
  { label: "Talleres", href: "#talleres" },
  { label: "Contacto", href: "#contacto" },
] as const;

export const NIVELES = [
  "Inicial",
  "Primaria",
  "Secundaria",
  "Preuniversitario",
] as const;

export const SERVICIOS = [
  "Reforzamiento académico",
  "Matrícula",
  "Beca 18",
  "Talleres",
  "Información general",
] as const;

export const scrollToSection = (id: string) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
