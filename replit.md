# Product Learning Hub

## Overview

PM Learning Hub is a product learning platform designed to help product managers develop their product sense through interactive exercises, case studies, and frameworks. The application combines educational content with gamification elements (streaks, progress tracking) to maintain user engagement while providing professional clarity in content organization.

The platform offers four main learning modules:
- **Strategy Library**: Real-world case studies of product wins and failures
- **Product Sense Gym**: Interactive exercises with AI-powered feedback
- **Framework Toolkit**: Product management frameworks and methodologies
- **Learning Journal**: Personal note-taking and reflection space

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack**:
- React 18 with TypeScript
- Vite as build tool and development server
- Wouter for client-side routing
- TanStack Query (React Query) for server state management

**UI Framework**:
- shadcn/ui component library (Radix UI primitives)
- Tailwind CSS for styling with custom design tokens
- Theme system supporting light/dark modes
- Custom design system inspired by Duolingo (encouragement), Notion (clarity), and Linear (precision)

**Component Architecture**:
- Reusable UI components in `client/src/components/ui/`
- Feature-specific components in `client/src/components/`
- Page components in `client/src/pages/`
- Sidebar navigation with collapsible menu
- Responsive design with mobile-first approach

**Design System**:
- Typography: Inter for headings/UI, system fonts for content
- Spacing: Tailwind units (2, 4, 6, 8, 12, 16, 20)
- Color system: HSL-based with CSS variables for theming
- Custom border radiuses and shadow system
- Hover/active elevation states for interactive elements

### Backend Architecture

**Technology Stack**:
- Express.js server
- TypeScript for type safety
- Session-based architecture (though session management not fully implemented in visible code)

**API Design**:
- RESTful endpoints under `/api/` prefix
- CRUD operations for journal entries
- Query endpoints for case studies, exercises, and frameworks
- AI integration endpoint for exercise analysis

**Data Layer**:
- In-memory storage implementation (`MemStorage` class)
- Interfaces defined for future database integration
- Seed data for case studies, exercises, and frameworks
- Schema validation using Zod

**Server Architecture**:
- Route registration in `server/routes.ts`
- Middleware for request logging with duration tracking
- JSON body parsing with raw body preservation
- Development-only features (Vite HMR, error overlay)

### Data Storage Solutions

**Current Implementation**:
- Hybrid storage approach:
  - In-memory storage for demo content (case studies, exercises, frameworks)
  - PostgreSQL for user-specific data

- PostgreSQL Tables (via Drizzle ORM):
  - `users` - User profiles from Replit Auth
  - `sessions` - Session storage for authentication
  - `subscriptions` - User subscription plans and status
  - `user_progress2` - XP, streaks, notification preferences
  - `user_activities` - Activity tracking for analytics
  - `support_tickets` - User support requests

- In-memory entities:
  - Case Studies (57 real-world product stories)
  - Exercises (practice scenarios)
  - Frameworks (PM methodologies)
  - Journal Entries (user notes)
  - User Progress (local streak/completion stats)

**Database Configuration**:
- Drizzle ORM configured for PostgreSQL
- Schema definitions in `shared/schema.ts` using Zod
- Neon serverless PostgreSQL driver
- Environment variable `DATABASE_URL` required for user features

### External Dependencies

**AI Integration**:
- OpenAI API for exercise response analysis
- Custom prompt engineering for PM mentor-style feedback
- JSON-structured responses with strengths, improvements, and tips
- Configuration via environment variables (`AI_INTEGRATIONS_OPENAI_BASE_URL`, `AI_INTEGRATIONS_OPENAI_API_KEY`)

**GitHub Integration**:
- Octokit REST client for GitHub API
- Replit Connectors for OAuth token management
- Repository creation and code pushing capabilities
- Token refresh logic with expiration handling
- Authentication via Replit identity tokens (`REPL_IDENTITY`, `WEB_REPL_RENEWAL`)

**Development Tools**:
- Replit-specific plugins (error overlay, dev banner, cartographer)
- Vite plugins for development experience
- Hot module replacement (HMR) via Vite

**Authentication Flow**:
- User Authentication: Uses Replit Auth (OpenID Connect)
  - Session-based authentication with PostgreSQL session store
  - Protected routes requiring authentication
  - Landing page for unauthenticated users
  - Post-login redirect with state refresh

- GitHub: Uses Replit Connector system for OAuth
  - Fetches access tokens from Replit Connectors API
  - Token refresh on expiration
  - Uncachable client pattern to ensure fresh tokens

**Subscription System**:
- Two-tier subscription plans:
  - Free: 5 case studies, 3 exercises/month, basic frameworks
  - Pro ($9.99/month): Unlimited access, AI feedback, progress tracking, email reminders
- Database-backed subscription tracking
- Upgrade pathway (Stripe integration ready)

**Activity Tracking**:
- Records user interactions (views, completions, submissions)
- Stored in PostgreSQL for analytics
- Integrated into key pages (Gym, Library)

**Support System**:
- Ticket submission with categories and priorities
- Status tracking (open, in_progress, resolved, closed)
- User-specific ticket history

**Data Flow for AI Features**:
1. User submits exercise response
2. Backend constructs context-aware prompt
3. OpenAI API analyzes response
4. Structured feedback returned to frontend
5. User progress incremented
6. Optional: Save insights to journal

**Feedback System**:
- User feedback submission (bugs, features, UX, content)
- Admin response workflow with notification creation
- Status tracking (new, reviewing, actioned, archived)
- Admin endpoints protected by ADMIN_USER_IDS environment variable

**Content Delivery**:
- Static assets served from `attached_assets/` directory
- Generated images for hero sections and illustrations
- Google Fonts integration (DM Sans, Geist Mono, Fira Code, Architects Daughter)