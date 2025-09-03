import HeroSection from '@/components/HeroSection';
import ServicesOverview from '@/components/ServicesOverview';
import FeaturedProjects from '@/components/FeaturedProjects';
import CTASection from '@/components/CTASection';

export default function Home() {
  return (
    <main className="min-h-screen bg-blueprint-dark text-white">
      {/* Hero Section with Enhanced Background */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-blueprint-dark via-blueprint-blue/10 to-blueprint-dark">
          {/* Animated gradient overlay with neon effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blueprint-blue/20 via-transparent to-blueprint-blue/20 pulse-glow" />
          {/* Additional depth layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blueprint-blue/5 to-blueprint-blue/15 animate-pulse" />
        </div>
        <div className="fade-in">
          <HeroSection />
        </div>
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