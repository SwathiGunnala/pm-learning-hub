# Design Guidelines: Product Learning Hub

## Design Approach

**Selected Approach:** Reference-Based (Duolingo's encouragement + Notion's clarity + Linear's precision)

**Justification:** Learning platform requiring motivational design that keeps users engaged while maintaining professional clarity. Duolingo's gamification warmth + Notion's content organization + Linear's clean UI creates an encouraging yet sophisticated learning environment.

**Key Design Principles:**
- Encouragement over intimidation
- Progress visibility and celebration
- Conversational, mentor-like tone
- Clean information architecture with playful accents

---

## Core Design Elements

### A. Typography

**Font Families:**
- Primary: Inter (headings, UI, metrics)
- Content: System UI optimized for reading (article content, case studies)

**Type Scale:**
- Page titles: text-4xl, font-bold
- Section headers: text-2xl, font-semibold  
- Card titles: text-lg, font-semibold
- Body text: text-base
- Metadata/labels: text-sm, font-medium
- Micro-copy: text-xs

### B. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20

**Grid Structure:**
- Dashboard: 3-column grid (lg:grid-cols-3, md:grid-cols-2, base: single column)
- Content pages: Sidebar + main (70/30 split on desktop)
- Cards: Uniform gap-6 spacing
- Container: max-w-7xl, px-6

---

## C. Component Library

### Navigation
- Fixed top bar (h-16) with logo, main navigation tabs (Dashboard | Library | Gym | Toolkit | Journal), user profile with streak badge
- Active tab: Border-b-2 accent, font-semibold
- Mobile: Hamburger menu, bottom nav bar for key sections

### Home Dashboard

**Hero Section** (py-16):
- Headline: "Your PM Brain Gym" (text-4xl, font-bold)
- Subheading: "Build product thinking muscle, one rep at a time" (text-xl)
- Right-aligned image: Friendly illustration of person with lightbulb/dumbbells hybrid (40% width desktop)
- Welcome back message with user name + streak count (flame icon + number)

**Stats Row** (grid-cols-3):
- Current streak card (flame icon, large number, encouraging message)
- Total exercises completed (checkmark icon)
- Skill level progress bar with label

**Today's Recommendations** (grid-cols-2):
- "Quick Win" card: 5-min exercise, preview text, "Start Now" button
- "Deep Dive" card: Case study highlight, estimated time, thumbnail image
- Each card: p-6, rounded-lg, border, hover:shadow-lg

**Continue Learning Section**:
- Horizontal scroll of in-progress items
- Each card: Thumbnail, title, progress bar, resume button

### Strategy Library

**Filter Bar**:
- Pill buttons: All | Wins | Fails | By Industry | By Company Size
- Search input (right-aligned)

**Case Study Grid** (grid-cols-2 lg:grid-cols-3):
- Card structure: Header image (aspect-video), category badge, title, 2-line preview, metadata row (read time, difficulty level), "Read Case" button
- Win/Fail visual indicator: Subtle border-l-4 treatment (green for wins, amber for fails)

**Case Study Detail Page**:
- Full-width header image with gradient overlay
- Content: max-w-3xl, centered
- Sections: Context, What Happened, Key Decisions, Outcome, Lessons Learned (each with icon)
- "Practice Exercise" callout box at end
- Sidebar: Related cases, save to journal button

### Product Sense Gym

**Exercise Selection**:
- Grid of exercise cards by type: Prioritization | Metrics | Strategy | Feature Design | User Research
- Each card: Icon, title, difficulty badge, "Start Exercise" button, completion count

**Exercise Interface**:
- Question/scenario in large card (p-8)
- Timer + difficulty indicator (top-right)
- Response textarea (generous size, min-h-48)
- "Get AI Feedback" primary button (full-width)
- Tips collapsible section

**AI Feedback Panel**:
- Animated reveal from bottom
- Sections: What You Did Well (green accent) | Areas to Strengthen (amber accent) | Mentor Tip (blue accent)
- Each section: Icon, bulleted feedback, expansion for deeper insights
- "Try Another" and "Save to Journal" action buttons

### Framework Toolkit

**Framework Cards Grid** (grid-cols-2 lg:grid-cols-3):
- Card: Framework name, one-line description, visual diagram placeholder, "Learn More" link
- Categories: Product Strategy | Discovery | Delivery | Growth | Metrics

**Framework Detail View**:
- Split layout: Diagram/visual (40%) + explanation (60%)
- Sections: When to Use, Step-by-Step, Real Example, Common Mistakes, Practice Exercise
- Downloadable template button
- "Add to Favorites" heart icon

### Learning Journal

**Entry List View**:
- Timeline format with date headers
- Entry cards: Timestamp, source tag (Library/Gym/Toolkit), title/excerpt, edit/delete icons
- "New Entry" floating action button (bottom-right)

**Entry Detail/Edit**:
- Rich text editor (Notion-style)
- Tags input
- "Link to Exercise/Case" selector
- Auto-save indicator

---

## D. Images

**Hero Section:**
- Placement: Right 40% of hero, desktop only
- Description: Warm, friendly illustration of diverse PM doing mental exercises - person with thought bubbles containing product icons, lightbulbs, and checkmarks. Playful but professional style with warm color palette. Could show person lifting "idea weights" or running on "strategy treadmill" - metaphorical gym concept
- Style: Modern flat illustration with gradient accents, approachable character design

**Case Study Cards:**
- Thumbnail images for each case study (aspect-video ratio)
- Real product screenshots or abstract representations of the scenario
- Subtle overlay gradient for text readability

**Framework Diagrams:**
- Custom diagrams for each framework (2x1 prioritization matrix, funnel shapes, etc.)
- Clean, minimalist style with accent colors

---

## E. Interactive Elements

**Progress Indicators:**
- Circular progress rings for skill levels
- Linear progress bars for in-progress content
- Streak flame animation on milestone achievements

**Buttons:**
- Primary: Rounded-lg, px-6 py-3, font-medium
- Secondary: Outlined, same size
- Icon buttons: p-2, rounded-md
- Buttons on hero image: Backdrop-blur-sm with semi-transparent background

**Gamification:**
- Celebration modals for streak milestones (confetti animation)
- Badge unlock notifications (slide-in from top)
- Progress level-up transitions

**Loading States:**
- AI feedback: Animated thinking indicator with encouraging messages ("Analyzing your thinking...", "Almost there...")
- Content loading: Skeleton screens matching card layouts

---

## Page Structure

**Dashboard:** Navigation → Hero with image → Stats row → Recommendations grid → Continue learning carousel → Footer

**Library:** Navigation → Filter bar → Case study grid → Footer

**Gym:** Navigation → Exercise type selector → Active exercise interface → Footer

**Toolkit:** Navigation → Search/filter → Framework grid → Footer

**Journal:** Navigation → New entry button → Timeline entries → Footer

**Footer** (py-12):
- Quick links: About, Help Center, Community
- Social proof: "12,000+ PMs building their product sense"
- Newsletter: "Weekly PM workout plan" with input + subscribe button
- Testimonial snippet with avatar

**Mobile:** Stack all grids to single column, collapsible sidebar to bottom drawer, reduced padding (py-8), bottom nav for main sections.