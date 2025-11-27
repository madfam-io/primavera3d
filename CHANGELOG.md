# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Comprehensive README.md documentation

### Removed

- Demo route (using real Cotiza embed instead)

## [0.1.0] - 2024-11-27

### Added

- Full quote-to-checkout flow with Janua payments integration
- Interactive 3D portfolio viewer with GLTF/GLB support
- Blueprint Aesthetic design system implementation
- Service pages for 3D printing, CNC, and laser cutting
- Contact form with CRM integration
- Order tracking system at `/orders`
- Cotiza quote calculator embed at `/quote`
- Sanity.io CMS integration for content management
- Responsive design with mobile-first approach
- Performance optimizations (LCP < 2.5s target)

### Technical

- Next.js 14 App Router architecture
- TypeScript 5 strict mode
- Tailwind CSS with custom Blueprint theme
- React Three Fiber for 3D rendering
- Prisma ORM with PostgreSQL
- AWS S3 for 3D model storage
- Cloudinary for image optimization
