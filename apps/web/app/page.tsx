import HeroSection from '@/components/HeroSection';
import ServicesOverview from '@/components/ServicesOverview';
import FeaturedProjects from '@/components/FeaturedProjects';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen bg-blueprint-dark text-white">
      {/* Hero Section - Clean & Readable */}
      <section className="relative h-screen overflow-hidden">
        {/* Simplified background - single subtle layer */}
        <div className="absolute inset-0 blueprint-grid opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-blueprint-dark/95 via-blueprint-dark/90 to-blueprint-dark/95" />
        
        {/* High contrast content overlay */}
        <div className="absolute inset-0 bg-black/20" />
        
        <HeroSection />
      </section>

      {/* Services Overview */}
      <ServicesOverview />

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Call to Action */}
      <CTASection />
    </main>
  );
}