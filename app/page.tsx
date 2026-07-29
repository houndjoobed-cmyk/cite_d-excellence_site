export const dynamic = 'force-dynamic';

import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProgramsSection from "@/components/home/ProgramsSection";
import SermonsSection from "@/components/home/SermonsSection";
import DepartmentsSection from "@/components/home/DepartmentsSection";
import LocationSection from "@/components/home/LocationSection";
import DonationSection from "@/components/home/DonationSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProgramsSection />
      <SermonsSection />
      <DepartmentsSection />
      <LocationSection />
      <DonationSection />
    </>
  );
}
