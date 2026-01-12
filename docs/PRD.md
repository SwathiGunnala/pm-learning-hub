# Product Requirements Document (PRD)
## PM Learning Hub

**Version:** 1.0  
**Last Updated:** January 2026  
**Status:** Production Ready

---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Product Vision & Goals](#2-product-vision--goals)
3. [Target Users](#3-target-users)
4. [System Architecture](#4-system-architecture)
5. [Feature Specifications](#5-feature-specifications)
6. [User Flows](#6-user-flows)
7. [Data Models](#7-data-models)
8. [API Specifications](#8-api-specifications)
9. [Authentication & Authorization](#9-authentication--authorization)
10. [Subscription Tiers](#10-subscription-tiers)
11. [External Integrations](#11-external-integrations)
12. [Edge Cases & Error Handling](#12-edge-cases--error-handling)
13. [Security Considerations](#13-security-considerations)
14. [Non-Functional Requirements](#14-non-functional-requirements)

---

## 1. Executive Summary

PM Learning Hub is a gamified learning platform designed to help product managers develop their product sense through interactive exercises, real-world case studies, and proven frameworks. The platform combines educational content with engagement mechanics (XP, streaks, progress tracking) inspired by Duolingo, with the organizational clarity of Notion and the precision of Linear.

### Key Value Propositions
- **Learn by Doing**: Interactive exercises with AI-powered feedback
- **Real-World Context**: 57+ case studies from companies like Duolingo, Spotify, Netflix, Amazon
- **Structured Frameworks**: Battle-tested PM methodologies ready to apply
- **Personal Growth Tracking**: Journal, progress metrics, and streak mechanics

---

## 2. Product Vision & Goals

### Vision Statement
To become the go-to platform for product managers seeking to sharpen their product sense through deliberate practice and real-world learning.

### Product Goals
| Goal | Metric | Target |
|------|--------|--------|
| User Engagement | Daily Active Users | 30% of registered users |
| Learning Completion | Case studies read per user | 10+ per month |
| Skill Development | Exercises completed with AI feedback | 5+ per month |
| Retention | 30-day retention rate | 40%+ |
| Conversion | Free to Pro upgrade rate | 5% |

### Success Criteria
- Users report improved product thinking in real work scenarios
- Consistent daily/weekly engagement patterns
- High NPS (>50) from active users
- Growing library of content that users find relevant

---

## 3. Target Users

### Primary Personas

#### Persona 1: Aspiring PM
- **Profile**: 1-3 years in adjacent roles (engineering, design, analytics)
- **Goals**: Break into product management, build foundational skills
- **Pain Points**: Lack of structured learning path, no PM mentorship access
- **Behavior**: High motivation, willing to invest time daily

#### Persona 2: Growth-Stage PM
- **Profile**: 2-5 years as PM, seeking advancement
- **Goals**: Develop product sense, improve decision-making frameworks
- **Pain Points**: Plateaued growth, wants exposure to diverse product contexts
- **Behavior**: Learns in focused bursts, values real-world examples

#### Persona 3: PM Team Lead
- **Profile**: Senior PM or Head of Product
- **Goals**: Upskill team members, create shared vocabulary
- **Pain Points**: Inconsistent PM skill levels, time-consuming coaching
- **Behavior**: Curates learning for team, tracks collective progress

---

## 4. System Architecture

### 4.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client (Browser)                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   React 18  │  │  TanStack   │  │  Wouter     │              │
│  │ + TypeScript│  │   Query     │  │  (Routing)  │              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
│  ┌─────────────────────────────────────────────────┐            │
│  │           shadcn/ui + Tailwind CSS              │            │
│  └─────────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Express.js Server                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐              │
│  │   Routes    │  │  Session    │  │  OpenAI     │              │
│  │   (REST)    │  │  Middleware │  │  Integration│              │
│  └─────────────┘  └─────────────┘  └─────────────┘              │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│   MemStorage    │  │   PostgreSQL    │  │    OpenAI API   │
│  (Demo Content) │  │   (User Data)   │  │   (AI Feedback) │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

### 4.2 Frontend Architecture

#### Technology Stack
| Technology | Purpose |
|------------|---------|
| React 18 | UI framework with TypeScript |
| Vite | Build tool and dev server |
| Wouter | Client-side routing |
| TanStack Query | Server state management |
| shadcn/ui | Component library (Radix primitives) |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Animations |

#### Directory Structure
```
client/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── app-sidebar.tsx  # Main navigation
│   │   ├── theme-toggle.tsx # Dark/light mode
│   │   └── ...
│   ├── pages/
│   │   ├── landing.tsx      # Unauthenticated landing
│   │   ├── home.tsx         # Authenticated dashboard
│   │   ├── library.tsx      # Strategy Library (public)
│   │   ├── gym.tsx          # Product Sense Gym (public)
│   │   ├── toolkit.tsx      # Framework Toolkit (public)
│   │   ├── journal.tsx      # Learning Journal (protected)
│   │   ├── settings.tsx     # User settings
│   │   ├── support.tsx      # Support tickets
│   │   └── profile.tsx      # User profile
│   ├── hooks/
│   │   └── use-auth.ts      # Authentication hook
│   ├── lib/
│   │   ├── queryClient.ts   # TanStack Query setup
│   │   └── utils.ts         # Utility functions
│   └── App.tsx              # Root component with routing
```

#### Component Hierarchy
```
App
├── SidebarProvider
│   ├── AppSidebar
│   │   ├── SidebarHeader (Logo, Profile)
│   │   ├── SidebarContent
│   │   │   ├── Navigation Menu (Library, Gym, Toolkit, Journal)
│   │   │   └── User Progress Stats
│   │   └── SidebarFooter (Settings, Support, Sign Out)
│   └── Main Content Area
│       ├── Header (Sidebar Toggle, Theme Toggle, Auth Status)
│       └── Router (Page Components)
└── Toaster (Notifications)
```

### 4.3 Backend Architecture

#### Technology Stack
| Technology | Purpose |
|------------|---------|
| Express.js | HTTP server framework |
| TypeScript | Type safety |
| Drizzle ORM | Database operations |
| Zod | Schema validation |
| express-session | Session management |
| connect-pg-simple | PostgreSQL session store |

#### Directory Structure
```
server/
├── routes.ts            # API endpoint definitions
├── storage.ts           # Storage interface & MemStorage
├── db.ts                # Database connection
├── auth.ts              # Replit Auth middleware
├── vite.ts              # Vite integration for dev
├── data/
│   ├── case-studies.ts  # Seeded case study content
│   ├── exercises.ts     # Seeded exercise content
│   └── frameworks.ts    # Seeded framework content
└── index.ts             # Server entry point

shared/
└── schema.ts            # Shared Zod schemas & Drizzle tables
```

---

## 5. Feature Specifications

### 5.1 Strategy Library

#### Description
A curated collection of 57+ real-world product case studies covering wins, failures, and pivots from notable companies.

#### Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| LIB-001 | Display case studies in card grid format | P0 |
| LIB-002 | Filter by outcome (Win/Fail) | P0 |
| LIB-003 | Filter by difficulty (Beginner/Intermediate/Advanced) | P0 |
| LIB-004 | Search by title, company, or keywords | P0 |
| LIB-005 | View full case study in modal/detail view | P0 |
| LIB-006 | Display read time and difficulty badges | P1 |
| LIB-007 | Save insights to journal (authenticated only) | P1 |
| LIB-008 | Track reading progress (authenticated only) | P2 |

#### UI Components
- **CaseStudyCard**: Preview card with company, title, outcome badge, read time
- **CaseStudyModal**: Full content view with lessons learned
- **FilterBar**: Outcome and difficulty dropdowns + search input
- **EmptyState**: Displayed when no results match filters

#### Case Study Categories
- Product Strategy
- User Growth
- Market Pivot
- Feature Launch
- Pricing Strategy
- Platform Dynamics
- Discovery & Activation
- Retention & Engagement

### 5.2 Product Sense Gym

#### Description
Interactive exercises that simulate real PM scenarios with AI-powered feedback on user responses.

#### Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| GYM-001 | Display exercises in category-organized view | P0 |
| GYM-002 | Filter by category (Prioritization, Strategy, etc.) | P0 |
| GYM-003 | Filter by difficulty level | P0 |
| GYM-004 | Display exercise context and scenario | P0 |
| GYM-005 | Accept user text response (500+ character minimum suggested) | P0 |
| GYM-006 | Submit response for AI analysis (authenticated only) | P0 |
| GYM-007 | Display AI feedback with strengths, improvements, tips | P0 |
| GYM-008 | Show hints on demand (progressive disclosure) | P1 |
| GYM-009 | Save response and feedback to journal | P1 |
| GYM-010 | Track exercises completed (authenticated only) | P2 |

#### Exercise Categories
- Prioritization
- Product Strategy
- Metrics & Measurement
- User Research
- Feature Design
- Discovery
- Activation
- Onboarding
- Retention
- Acquisition
- Engagement
- Post-Purchase

#### AI Feedback Structure
```typescript
interface AIFeedback {
  strengths: string[];      // What the user did well
  improvements: string[];   // Areas to develop
  tip: string;              // Actionable advice
}
```

### 5.3 Framework Toolkit

#### Description
A library of proven product management frameworks with step-by-step guides and real-world examples.

#### Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| TK-001 | Display frameworks in categorized grid | P0 |
| TK-002 | Filter by category | P0 |
| TK-003 | View full framework in detail view | P0 |
| TK-004 | Display when-to-use scenarios | P0 |
| TK-005 | Show step-by-step implementation | P0 |
| TK-006 | Include real-world example | P0 |
| TK-007 | List common mistakes to avoid | P1 |
| TK-008 | Save framework notes to journal | P1 |

#### Framework Categories
- Strategy
- Prioritization
- Discovery
- Metrics
- Communication
- Growth

### 5.4 Learning Journal

#### Description
Personal space for users to capture insights, reflections, and learnings from their platform activities.

#### Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| JRN-001 | Create new journal entries | P0 |
| JRN-002 | Edit existing entries | P0 |
| JRN-003 | Delete entries with confirmation | P0 |
| JRN-004 | Tag entries for organization | P1 |
| JRN-005 | Link entries to source content (case study, exercise, etc.) | P1 |
| JRN-006 | Search and filter entries | P1 |
| JRN-007 | Display entry excerpts in list view | P0 |
| JRN-008 | Require authentication for all operations | P0 |

#### Entry Sources
- `library` - From case study insights
- `gym` - From exercise responses
- `toolkit` - From framework notes
- `personal` - Original reflections
- `lesson` - From structured lessons
- `challenge` - From challenge completions

### 5.5 User Dashboard (Home)

#### Description
Authenticated user's personalized dashboard showing progress, streaks, and recommended next actions.

#### Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| HOME-001 | Display current streak count | P0 |
| HOME-002 | Show XP points and level progress | P0 |
| HOME-003 | List recently viewed content | P1 |
| HOME-004 | Suggest next actions based on progress | P1 |
| HOME-005 | Display subscription status | P0 |
| HOME-006 | Show quick stats (exercises completed, case studies read) | P1 |

### 5.6 Settings & Profile

#### Description
User preferences, notification settings, and account management.

#### Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| SET-001 | View and edit profile information | P0 |
| SET-002 | Toggle email notifications | P1 |
| SET-003 | Toggle streak reminders | P1 |
| SET-004 | View subscription details | P0 |
| SET-005 | Manage subscription (upgrade/cancel) | P0 |
| SET-006 | Theme preference (light/dark/system) | P1 |

### 5.7 Support System

#### Description
Allow users to submit and track support tickets.

#### Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| SUP-001 | Submit new support ticket | P0 |
| SUP-002 | Select ticket category | P0 |
| SUP-003 | Set ticket priority | P1 |
| SUP-004 | View ticket history | P0 |
| SUP-005 | Track ticket status | P0 |

#### Ticket Categories
- Bug Report
- Feature Request
- Account Issue
- Content Feedback
- Other

#### Ticket Statuses
- `open` - Newly submitted
- `in_progress` - Being reviewed
- `resolved` - Issue addressed
- `closed` - Ticket closed

---

## 6. User Flows

### 6.1 New User Onboarding

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Landing   │────▶│   Sign In   │────▶│  Dashboard  │
│    Page     │     │ (Replit Auth)│     │   (Home)    │
└─────────────┘     └─────────────┘     └─────────────┘
       │                                       │
       ▼                                       ▼
┌─────────────┐                         ┌─────────────┐
│   Browse    │                         │   Explore   │
│   Public    │                         │   Content   │
│   Content   │                         │  + Features │
└─────────────┘                         └─────────────┘
```

### 6.2 Content Exploration (Unauthenticated)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Library   │────▶│   Select    │────▶│   View      │
│   Browse    │     │  Case Study │     │  Details    │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │ "Sign in to │
                                        │save insight"│
                                        └─────────────┘
```

### 6.3 Exercise Completion (Authenticated)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Gym      │────▶│   Select    │────▶│    View     │
│   Browse    │     │  Exercise   │     │  Context    │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Save to   │◀────│   View AI   │◀────│   Submit    │
│   Journal   │     │  Feedback   │     │  Response   │
└─────────────┘     └─────────────┘     └─────────────┘
```

### 6.4 Subscription Upgrade

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Upgrade   │────▶│   Review    │────▶│   Payment   │
│    CTA      │     │    Plans    │     │  (Stripe)   │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │   Pro User  │
                                        │  Dashboard  │
                                        └─────────────┘
```

---

## 7. Data Models

### 7.1 Database Schema (PostgreSQL)

#### Users Table
```typescript
users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  bio: text("bio"),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

#### Subscriptions Table
```typescript
subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  plan: text("plan").notNull().default("free"), // "free" | "pro"
  status: text("status").notNull().default("active"),
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

#### User Progress Table
```typescript
userProgress2 = pgTable("user_progress2", {
  id: serial("id").primaryKey(),
  odai: userId: integer("user_id").notNull().references(() => users.id),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  totalXp: integer("total_xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  lessonsCompleted: jsonb("lessons_completed").$type<string[]>().default([]),
  unitsCompleted: jsonb("units_completed").$type<string[]>().default([]),
  challengesCompleted: integer("challenges_completed").notNull().default(0),
  lastActivityDate: varchar("last_activity_date"),
  emailNotifications: boolean("email_notifications").notNull().default(true),
  streakReminders: boolean("streak_reminders").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

#### User Activities Table
```typescript
userActivities = pgTable("user_activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  activityType: text("activity_type").notNull(),
  contentType: text("content_type"),
  contentId: text("content_id"),
  metadata: jsonb("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow(),
});
```

#### Support Tickets Table
```typescript
supportTickets = pgTable("support_tickets", {
  id: serial("id").primaryKey(),
  odai: userId: integer("user_id").notNull().references(() => users.id),
  subject: text("subject").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  priority: text("priority").notNull().default("medium"),
  status: text("status").notNull().default("open"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
```

### 7.2 In-Memory Schema (MemStorage)

#### Case Study
```typescript
interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  outcome: "win" | "fail";
  preview: string;
  content: string;
  lessons: string[];
  readTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}
```

#### Exercise
```typescript
interface Exercise {
  id: string;
  category: string;
  title: string;
  context: string;
  scenario: string[];
  question: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  hints?: string[];
}
```

#### Framework
```typescript
interface Framework {
  id: string;
  title: string;
  description: string;
  category: string;
  whenToUse: string[];
  steps: string[];
  example: string;
  commonMistakes: string[];
}
```

#### Journal Entry
```typescript
interface JournalEntry {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  source: "library" | "gym" | "toolkit" | "personal" | "lesson" | "challenge";
  tags: string[];
  linkedItemId?: string;
}
```

---

## 8. API Specifications

### 8.1 Content Endpoints (Public)

#### GET /api/case-studies
Returns all case studies.

**Response:**
```json
{
  "caseStudies": [
    {
      "id": "duolingo-onboarding",
      "title": "Duolingo's Gamified Onboarding",
      "company": "Duolingo",
      "industry": "EdTech",
      "outcome": "win",
      "preview": "How Duolingo achieved 95% completion...",
      "readTime": "8 min",
      "difficulty": "intermediate"
    }
  ]
}
```

#### GET /api/case-studies/:id
Returns a single case study by ID.

#### GET /api/exercises
Returns all exercises.

#### GET /api/exercises/:id
Returns a single exercise by ID.

#### GET /api/frameworks
Returns all frameworks.

#### GET /api/frameworks/:id
Returns a single framework by ID.

### 8.2 Journal Endpoints (Authenticated)

#### GET /api/journal
Returns all journal entries for authenticated user.

#### POST /api/journal
Creates a new journal entry.

**Request Body:**
```json
{
  "title": "Insights from Netflix Retention Case",
  "content": "Key learning: Focus on personalization...",
  "source": "library",
  "tags": ["retention", "personalization"],
  "linkedItemId": "netflix-retention"
}
```

#### PATCH /api/journal/:id
Updates a journal entry.

#### DELETE /api/journal/:id
Deletes a journal entry.

### 8.3 AI Analysis Endpoint (Authenticated)

#### POST /api/analyze-response
Submits an exercise response for AI analysis.

**Request Body:**
```json
{
  "exerciseId": "prioritization-1",
  "response": "My approach to prioritizing these features..."
}
```

**Response:**
```json
{
  "feedback": {
    "strengths": [
      "Good use of impact vs effort framework",
      "Considered user research data"
    ],
    "improvements": [
      "Could quantify impact more precisely",
      "Missing consideration of technical debt"
    ],
    "tip": "Try the ICE scoring method for more objective prioritization"
  }
}
```

### 8.4 User Endpoints (Authenticated)

#### GET /api/auth/user
Returns current authenticated user.

#### GET /api/user/progress
Returns user's progress data.

#### POST /api/user/activities
Records a user activity.

**Request Body:**
```json
{
  "activityType": "view",
  "contentType": "case_study",
  "contentId": "duolingo-onboarding"
}
```

#### GET /api/subscription
Returns user's subscription details.

### 8.5 Support Endpoints (Authenticated)

#### GET /api/support/tickets
Returns user's support tickets.

#### POST /api/support/tickets
Creates a new support ticket.

**Request Body:**
```json
{
  "subject": "Cannot access AI feedback",
  "description": "When I submit my response...",
  "category": "Bug Report",
  "priority": "high"
}
```

---

## 9. Authentication & Authorization

### 9.1 Authentication Flow (Replit Auth)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│  Replit     │────▶│   Server    │
│  Click Sign │     │  OpenID     │     │  Validate   │
│    In       │     │  Connect    │     │   Token     │
└─────────────┘     └─────────────┘     └─────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │   Create    │
                                        │   Session   │
                                        └─────────────┘
```

### 9.2 Session Management
- Sessions stored in PostgreSQL via `connect-pg-simple`
- Session cookie: `connect.sid`
- Session expiry: 7 days
- Secure cookies in production

### 9.3 Route Protection Matrix

| Route | Auth Required | Notes |
|-------|---------------|-------|
| `/` | No | Landing or Dashboard |
| `/library` | No | Public browsing |
| `/gym` | No | Public browsing |
| `/toolkit` | No | Public browsing |
| `/journal` | Yes | Redirects to landing |
| `/settings` | Yes | Redirects to landing |
| `/support` | Yes | Redirects to landing |
| `/profile` | Yes | Redirects to landing |

### 9.4 API Authorization

| Endpoint | Auth | Subscription |
|----------|------|--------------|
| `GET /api/case-studies` | None | None |
| `GET /api/exercises` | None | None |
| `GET /api/frameworks` | None | None |
| `POST /api/analyze-response` | Required | Pro only |
| `GET /api/journal` | Required | Any |
| `POST /api/journal` | Required | Any |
| `GET /api/subscription` | Required | Any |
| `POST /api/support/tickets` | Required | Any |

---

## 10. Subscription Tiers

### 10.1 Free Tier ($0/month)

| Feature | Limit |
|---------|-------|
| Case Studies | 5 per month |
| Exercises | 3 per month |
| Frameworks | Basic only |
| AI Feedback | Not available |
| Journal | Not available |
| Progress Tracking | Basic |
| Email Reminders | Not available |

### 10.2 Pro Tier ($19/month)

| Feature | Limit |
|---------|-------|
| Case Studies | Unlimited |
| Exercises | Unlimited |
| Frameworks | All frameworks |
| AI Feedback | Unlimited |
| Journal | Full access |
| Progress Tracking | Advanced |
| Email Reminders | Available |
| Priority Support | Available |

### 10.3 Upgrade Prompts

Upgrade CTAs displayed when:
- Free user attempts to access AI feedback
- Free user exceeds monthly content limits
- Free user tries to access journal
- On settings page for free users

---

## 11. External Integrations

### 11.1 OpenAI Integration

**Purpose:** Power AI-driven exercise feedback

**Configuration:**
- Base URL: `AI_INTEGRATIONS_OPENAI_BASE_URL`
- API Key: `AI_INTEGRATIONS_OPENAI_API_KEY`
- Model: GPT-4 or equivalent

**Prompt Strategy:**
- System prompt: PM mentor persona
- Context: Exercise details + user response
- Output: Structured JSON (strengths, improvements, tip)

### 11.2 Replit Auth Integration

**Purpose:** User authentication via Replit accounts

**Flow:**
1. User clicks "Sign In with Replit"
2. Redirected to Replit OAuth
3. Returns with OpenID Connect token
4. Server validates and creates session
5. User data synced to database

### 11.3 GitHub Integration

**Purpose:** Export projects or share progress

**Configuration:**
- Uses Replit Connectors for OAuth
- Token management via `REPL_IDENTITY`
- Supports repo creation and code push

---

## 12. Edge Cases & Error Handling

### 12.1 Authentication Edge Cases

| Scenario | Handling |
|----------|----------|
| Session expired mid-action | Redirect to login with return URL |
| Auth callback failure | Display error with retry option |
| User deleted from Replit | Gracefully handle missing user |
| Concurrent sessions | Allow; last write wins |

### 12.2 Content Edge Cases

| Scenario | Handling |
|----------|----------|
| Empty search results | Show "No results" with clear filters option |
| Missing case study ID | 404 with redirect to library |
| Invalid exercise ID | 404 with redirect to gym |
| No journal entries | Show empty state with prompt |

### 12.3 AI Feedback Edge Cases

| Scenario | Handling |
|----------|----------|
| OpenAI API timeout | Show retry button, cache partial |
| Rate limit exceeded | Queue with estimated wait time |
| Invalid response format | Fallback to generic feedback |
| Empty user response | Validate minimum length client-side |
| Response too long | Truncate with warning |

### 12.4 Network & Database Edge Cases

| Scenario | Handling |
|----------|----------|
| Database connection lost | Graceful degradation, show cached |
| Neon DNS errors (EAI_AGAIN) | Auto-retry with exponential backoff |
| Slow network | Show loading states, timeouts |
| Concurrent writes | Optimistic UI with conflict resolution |

### 12.5 Subscription Edge Cases

| Scenario | Handling |
|----------|----------|
| Payment failure | Maintain access until period end |
| Downgrade mid-period | Access until period end |
| Upgrade mid-period | Immediate access |
| Expired trial | Graceful downgrade to free |

---

## 13. Security Considerations

### 13.1 Authentication Security

- [x] Session tokens stored securely (httpOnly, secure, sameSite)
- [x] CSRF protection via token validation
- [x] Session regeneration on privilege change
- [x] Secure password-less flow via Replit OAuth

### 13.2 Data Security

- [x] Input validation via Zod schemas
- [x] SQL injection prevention via Drizzle ORM
- [x] XSS prevention via React's default escaping
- [x] Sensitive data not logged

### 13.3 API Security

- [x] Rate limiting on AI endpoints
- [x] Request body size limits
- [x] Authentication middleware on protected routes
- [x] Subscription validation on premium features

### 13.4 Secrets Management

- [x] API keys stored in environment variables
- [x] Keys never exposed to client
- [x] Replit Secrets for sensitive values
- [x] Key rotation support via Connectors

### 13.5 Content Security

- [x] User-generated content sanitized
- [x] File uploads validated (if applicable)
- [x] CSP headers configured
- [x] HTTPS enforced

---

## 14. Non-Functional Requirements

### 14.1 Performance

| Metric | Target |
|--------|--------|
| Page Load (LCP) | < 2.5s |
| Time to Interactive | < 3.5s |
| API Response Time (P95) | < 500ms |
| AI Feedback Response | < 10s |

### 14.2 Scalability

| Component | Strategy |
|-----------|----------|
| Frontend | CDN distribution, code splitting |
| Backend | Horizontal scaling, connection pooling |
| Database | Read replicas, query optimization |
| AI | Request queuing, caching |

### 14.3 Availability

| Metric | Target |
|--------|--------|
| Uptime | 99.5% |
| RTO (Recovery Time) | < 4 hours |
| RPO (Recovery Point) | < 1 hour |

### 14.4 Accessibility

- WCAG 2.1 AA compliance target
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements met
- Focus indicators visible

### 14.5 Browser Support

| Browser | Versions |
|---------|----------|
| Chrome | Last 2 versions |
| Firefox | Last 2 versions |
| Safari | Last 2 versions |
| Edge | Last 2 versions |
| Mobile Safari | iOS 14+ |
| Chrome Mobile | Android 10+ |

---

## Appendix A: Content Inventory

### Case Studies (57+)
- **Wins:** Netflix, Spotify, Slack, Dropbox, Duolingo, HubSpot, Amazon, and more
- **Failures:** Quibi, Google+, Windows Phone, and more
- **Categories:** Strategy, Growth, Retention, Activation, Discovery

### Exercises (25+)
- Prioritization scenarios
- Product strategy challenges
- Metrics & measurement problems
- User research interpretation
- Feature design exercises
- Funnel optimization cases

### Frameworks (20+)
- RICE Scoring
- Jobs to Be Done
- North Star Metrics
- AARRR Pirate Metrics
- User Story Mapping
- Opportunity Solution Trees
- Discovery, Activation, Retention frameworks
- And more...

---

## Appendix B: Glossary

| Term | Definition |
|------|------------|
| XP | Experience Points - gamification currency |
| Streak | Consecutive days of activity |
| Case Study | Real-world product story with lessons |
| Exercise | Interactive PM scenario for practice |
| Framework | Structured methodology for PM work |
| Journal | User's personal learning notes |
| Pro | Paid subscription tier |
| MemStorage | In-memory data store for demo content |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 2026 | PM Learning Hub Team | Initial PRD |
