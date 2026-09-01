import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { AboutSection } from "@/components/site/AboutSection";
import { LevelsSection } from "@/components/site/LevelsSection";
import { Beca18Section } from "@/components/site/Beca18Section";
import { WorkshopsSection } from "@/components/site/WorkshopsSection";
import { ScheduleSection } from "@/components/site/ScheduleSection";
import { InformationForm } from "@/components/site/InformationForm";
import { EnrollmentForm } from "@/components/site/EnrollmentForm";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { scrollToSection } from "@/config/site";
import type { InfoPreset, NivelValue } from "@/components/site/forms.types";

const TITLE = "Triunfa Beca | Academia preuniversitaria y asesoría Beca 18";
const DESCRIPTION =
  "Academia Triunfa Beca: reforzamiento en Inicial, Primaria, Secundaria y Preuniversitario, talleres los sábados y asesoramiento para postular a Beca 18.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [preset, setPreset] = useState<InfoPreset>({ token: 0 });

  const requestInfo = (nivel: NivelValue) => {
    setPreset({ nivel, token: Date.now() });
    scrollToSection("#informacion");
  };

  const requestBeca18 = () => {
    setPreset({ servicio: "Beca 18", token: Date.now() });
    scrollToSection("#informacion");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <LevelsSection onRequest={requestInfo} />
        <Beca18Section onRequest={requestBeca18} />
        <WorkshopsSection />
        <ScheduleSection />
        <InformationForm preset={preset} />
        <EnrollmentForm />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
