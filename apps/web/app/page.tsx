import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import HeroSection from '@/components/HeroSection';
import ServicesOverview from '@/components/ServicesOverview';
import FeaturedProjects from '@/components/FeaturedProjects';
import CTASection from '@/components/CTASection';

const Scene3DHero = dynamic(() => import('@/components/Scene3DHero'), {
  ssr: false,
  loading: () => <div className="w-full h-[70vh] bg-gradient-to-b from-blueprint-dark to-blueprint-blue/20" />
});

export default function Home() {
  return (
    <main className="min-h-screen bg-blueprint-dark text-white">
      {/* 3D Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-20" />
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blueprint-blue mx-auto" />
              <p className="mt-4 text-blueprint-light">Loading 3D experience...</p>
            </div>
          </div>
        }>
          <Scene3DHero />
        </Suspense>
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