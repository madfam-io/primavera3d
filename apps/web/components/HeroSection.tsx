'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Zap } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative z-10 flex items-center justify-center h-full">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            <span className="bg-gradient-to-r from-blueprint-blue to-blueprint-light bg-clip-text text-transparent">
              Primavera3D
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transforming ideas into reality through advanced 3D modeling, 
            parametric design, and digital fabrication
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center px-8 py-3 bg-blueprint-blue text-white rounded-lg hover:bg-blueprint-blue/80 transition-colors"
          >
            View Portfolio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3 border border-blueprint-blue text-blueprint-light rounded-lg hover:bg-blueprint-blue/10 transition-colors"
          >
            Start a Project
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <Cpu className="h-6 w-6 text-blueprint-blue" />
            <span>CAD/CAM Expertise</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <Layers className="h-6 w-6 text-blueprint-blue" />
            <span>Parametric Design</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-gray-400">
            <Zap className="h-6 w-6 text-blueprint-blue" />
            <span>Rapid Prototyping</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}