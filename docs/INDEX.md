# Primavera3D Documentation

> _Internal manufacturing and engineering platform for MADFAM_

## Quick Navigation

| Document                           | Description                      |
| ---------------------------------- | -------------------------------- |
| [README](../README.md)             | Project overview and quick start |
| [CHANGELOG](../CHANGELOG.md)       | Version history and changes      |
| [CONTRIBUTING](../CONTRIBUTING.md) | Development guidelines           |
| [SECURITY](../SECURITY.md)         | Security policies                |

## Architecture

| Document                                              | Description                  |
| ----------------------------------------------------- | ---------------------------- |
| [Architecture Overview](architecture/ARCHITECTURE.md) | System design and components |
| [Visual Design System](VISUAL_DESIGN_SYSTEM.md)       | UI/UX design specifications  |

## Feature Documentation

### Core Features

- **Cotiza Integration** - Embedded quote calculator from digifab-quoting
- **Project Management** - Manufacturing project tracking
- **Customer Portal** - Customer-facing project views

### Routes

| Route            | Purpose                     |
| ---------------- | --------------------------- |
| `/`              | Landing/dashboard           |
| `/cotiza`        | Quote calculator (embedded) |
| `/projects`      | Project listing             |
| `/projects/[id]` | Project detail view         |

## MADFAM Ecosystem Integration

Primavera3D integrates with other MADFAM applications:

| App                                              | Integration               |
| ------------------------------------------------ | ------------------------- |
| [Digifab-Quoting](../../digifab-quoting)         | Quote calculator (Cotiza) |
| [Sim4D](../../sim4d)                             | CAD visualization         |
| [Blueprint-Harvester](../../blueprint-harvester) | Asset ingestion           |
| [Dhanam](../../dhanam)                           | Financial tracking        |

## Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Quick Start

```bash
pnpm install
pnpm dev
```

### Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL

---

_Last updated: November 2025_
