# Next.js + Fastify Integration

This project demonstrates the integration of a Next.js frontend with a Fastify backend.

## Project Structure

```
.
├── client/          # Next.js frontend application
│   ├── app/        # Next.js app directory
│   └── public/     # Static assets
└── server/         # Fastify backend application
    ├── src/        # Source code
    └── test/       # Test files
```

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- npm or yarn

### Development

1. Start the Fastify server:
```bash
cd server
npm install
npm run dev
```

2. Start the Next.js client:
```bash
cd client
npm install
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

## Features

- Next.js 15 with App Router
- Fastify backend with TypeScript
- CORS enabled for local development
- Type-safe API communication

## License

MIT 