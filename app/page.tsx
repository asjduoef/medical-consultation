import { HeroSection } from '@/components/site/sections/hero-section';
import { ServicesSection } from '@/components/site/sections/services-section';
import { PracticeAreasSection } from '@/components/site/sections/practice-areas-section';
import { AboutPreviewSection } from '@/components/site/sections/about-preview-section';
import { FinalCTASection } from '@/components/site/sections/final-cta-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPreviewSection />
      <PracticeAreasSection />
      <ServicesSection />
      <FinalCTASection />
    </>
  );
}
