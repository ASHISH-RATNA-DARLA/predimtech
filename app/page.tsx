"use client";

import { Suspense } from "react";
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import AboutSection from "@/components/about-section"
import ContactSection from "@/components/contact-section"
import TeamSection from "@/components/team-section"
import { ScrollToSection } from "@/components/scroll-to-section"
import { TrustedBySection } from "@/components/trusted-by-section"

function HomeContent() {
  return (
    <div className="home-page">
      <ScrollToSection />
      <section id="home" className="section-container h-screen" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <HeroSection />
      </section>

      <section id="about" className="section-container">
        <AboutSection />
      </section>

      <section id="services" className="section-container" style={{ minHeight: "auto" }}>
        <ServicesSection />
      </section>

      <TrustedBySection />

      <section id="contact" className="section-container">
        <ContactSection />
      </section>

      <TeamSection />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
