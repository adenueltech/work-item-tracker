# Work Item Management System

A full-stack application for managing work items with user authentication. Built with NestJS backend and Next.js frontend, using PostgreSQL database with Prisma ORM.

## Project Overview

This application allows users to:
- Register and authenticate
- Create, read, update, and delete work items
- Manage work item statuses (todo, in progress, completed)
- View work items in a responsive UI

## Technology Stack

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with Passport
- **Password Hashing**: bcryptjs

### Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: React Hooks
- **Forms**: React Hook Form with Zod validation

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Database**: PostgreSQL 15

## Project Structure

```
work-item/
├── backend/                          # NestJS backend application
│   ├── src/
│   │   ├── auth/                     # Authentication module
│   │   │   ├── auth.controller.ts    # Auth endpoints
│   │   │   ├── auth.module.ts        # Auth module configuration
│   │   │   ├── auth.service.ts       # Auth business logic
│   │   │   ├── jwt-auth.guard.ts     # JWT authentication guard
│   │   │   ├── jwt.strategy.ts       # JWT strategy
│   │   │   └── *.spec.ts             # Unit tests
│   │   ├── work-items/               # Work items module
│   │   │   ├── work-items.controller.ts  # Work items endpoints
│   │   │   ├── work-items.module.ts      # Work items module config
│   │   │   ├── work-items.service.ts     # Work items business logic
│   │   │   └── *.spec.ts                 # Unit tests
│   │   ├── app.controller.ts         # Main app controller
│   │   ├── app.module.ts             # Main app module
│   │   ├── app.service.ts            # Main app service
│   │   └── main.ts                   # Application entry point
│   ├── prisma/
│   │   ├── schema.prisma             # Database schema
│   │   └── migrations/               # Database migrations
│   ├── test/                         # End-to-end tests
│   ├── .env                          # Environment variables (local)
│   ├── .env.example                  # Environment variables template
│   ├── package.json                  # Backend dependencies
│   └── tsconfig.json                 # TypeScript configuration
├── frontend/                         # Next.js frontend application
│   ├── app/                          # Next.js app directory
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   ├── components/                   # React components
│   │   ├── ui/                       # Reusable UI components (Radix UI)
│   │   ├── auth-modal.tsx            # Authentication modal
│   │   ├── add-item-modal.tsx        # Add work item modal
│   │   ├── work-item-card.tsx        # Work item display card
│   │   ├── work-item-list.tsx        # Work items list component
│   │   ├── header.tsx                # App header
│   │   ├── sidebar.tsx               # App sidebar
│   │   └── theme-provider.tsx        # Theme provider
│   ├── hooks/                        # Custom React hooks
│   ├── lib/                          # Utility functions
│   ├── public/                       # Static assets
│   ├── styles/                       # Additional styles
│   ├── package.json                  # Frontend dependencies
│   ├── next.config.mjs               # Next.js configuration
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   ├── components.json               # shadcn/ui configuration
│   └── tsconfig.json                 # TypeScript configuration
├── docker-compose.yml                # Docker Compose configuration
├── Dockerfile                        # Multi-stage Docker build
└── README.md                         # This file
```

## Database Schema

### User Model
- `id`: Primary key (auto-increment)
- `email`: Unique email address
- `password`: Hashed password
- `name`: Optional display name
- `createdAt`: Creation timestamp
- `updatedAt`: Update timestamp
- `workItems`: One-to-many relation with WorkItem

### WorkItem Model
- `id`: Primary key (auto-increment)
- `title`: Work item title
- `description`: Work item description
- `status`: Status (default: "todo")
- `createdAt`: Creation timestamp
- `updatedAt`: Update timestamp
- `userId`: Foreign key to User
- `user`: Relation to User

## Setup Instructions

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd work-item
   ```

2. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   npm install
   npx prisma migrate dev
   npx prisma generate
   npm run start:dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Docker Setup

1. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - Database: localhost:5433

### Environment Variables

For Docker setup, copy `.env.example` to `.env` and configure:

```env
POSTGRES_DB=workitem_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password_here
DATABASE_URL=postgresql://postgres:your_password_here@db:5432/workitem_db?schema=public
```

For local development, copy `backend/.env.example` to `backend/.env` and configure:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
JWT_SECRET="your-jwt-secret-here"
```

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### Work Items (Protected)
- `GET /work-items` - Get all work items for authenticated user
- `POST /work-items` - Create new work item
- `GET /work-items/:id` - Get specific work item
- `PATCH /work-items/:id` - Update work item
- `DELETE /work-items/:id` - Delete work item

## Running Tests

### Backend Tests
```bash
cd backend
npm run test
npm run test:e2e
```

### Frontend Tests
```bash
cd frontend
npm run lint
```

## Deployment

### Production Build
```bash
docker-compose -f docker-compose.yml up --build -d
```

### Environment Configuration
Ensure all environment variables are set in production, especially:
- Strong JWT secret
- Production database URL
- Proper CORS settings if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests
5. Submit a pull request

## License

This project is licensed under the MIT License.