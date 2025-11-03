# Design Guidelines: Product Training Article Builder

## Design Approach

**Selected Approach:** Hybrid (Notion-inspired editor + Linear's precision)

**Justification:** This is a content creation and learning tool requiring clean, distraction-free writing environment combined with intelligent UI for AI-powered features. Drawing from Notion's editor excellence and Linear's structured clarity creates the perfect balance for professional product training content.

**Key Design Principles:**
- Content-first clarity with generous whitespace
- Intelligent information hierarchy
- Seamless AI integration without disruption
- Professional yet approachable aesthetics

---

## Core Design Elements

### A. Typography

**Font Families:**
- Primary: Inter (headings, UI elements, buttons)
- Content: Georgia or Charter (article body for readability)
- Mono: JetBrains Mono (code snippets, if needed)

**Type Scale:**
- Hero/Page titles: text-4xl to text-5xl, font-bold
- Section headers: text-2xl to text-3xl, font-semibold
- Article titles in preview: text-xl, font-semibold
- Body text: text-base to text-lg (article content should be generous)
- Input labels: text-sm, font-medium
- Helper text: text-sm
- UI metadata: text-xs

**Reading Optimization:**
- Article preview: max-w-3xl for optimal reading width
- Line height: leading-relaxed for article content
- Paragraph spacing: space-y-4 to space-y-6

### B. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24

**Grid Structure:**
- Two-column primary layout: 60/40 split (Editor/Preview on left, Sidebar on right)
- Mobile: Single column, stacked sections
- Container: max-w-7xl with px-6 to px-8
- Section padding: py-12 to py-20 (desktop), py-8 (mobile)

**Component Spacing:**
- Between major sections: space-y-12
- Form field groups: space-y-6
- Card internal padding: p-6 to p-8
- Button groups: gap-4

### C. Component Library

#### Navigation
- Fixed top navigation bar with minimal height (h-16)
- Left: Logo/Brand + "Product Article Builder"
- Right: User profile, settings icon, help icon
- Clean, borderless design with subtle shadow on scroll

#### Hero Section
**Layout:** Full-width with centered content, py-20 to py-24
**Content:**
- Headline: "Build Engaging Product Stories" (text-5xl, font-bold)
- Subheadline: "Create conversational, grade-7 product training articles with real-life examples that resonate" (text-xl)
- Quick stats row: "500+ Articles Created | 95% Readability Score | Used by 2,000+ PMs"
- Primary CTA: "Start Writing" button (large, px-8 py-4)
**Image:** Right-aligned illustration/photo showing collaborative product team or knowledge sharing moment (40% width on desktop)

#### Input Form Section
**Container:** Rounded card with border, p-8, shadow-sm
**Fields:**
1. Article Topic (large text input, text-lg)
2. Key Product Lesson (textarea, 3-4 rows)
3. Target Length (segmented button control: Short/Medium/Long)
4. Example Type selector (pill buttons: "Customer Story" | "Personal Experience" | "Case Study" | "Daily Scenario")
5. Advanced options (collapsible): Tone adjustments, specific frameworks
**Generate Button:** Full-width, prominent, py-4, with loading state showing AI thinking indicator

#### Article Preview Area
**Container:** Clean white card with generous padding (p-8 to p-12)
**Structure:**
- Generated article title (editable on click)
- Reading time estimate + grade level indicator
- Article content with proper paragraph spacing
- Inline "Product Lesson" callout boxes (border-l-4, pl-6, italic, with lightbulb icon)
- Real-life example sections with subtle background treatment
**Actions Bar:** Floating bottom bar with Regenerate, Refine, Download buttons

#### Product Lessons Sidebar
**Sticky Positioning:** Sticks to viewport on scroll
**Content:**
- "Key Takeaways" header
- Numbered list of product lessons (3-5 items)
- Each lesson: Mini-card with icon, bold title, brief description
- "Practice Exercise" card at bottom with suggested activity
**Styling:** Subtle border, p-6, space-y-4

#### Regenerate/Refine Modal
**Overlay:** Semi-transparent backdrop
**Modal:** Centered card, max-w-2xl
**Options:**
- Tone sliders: More casual ↔ More professional
- Example type toggles
- Length adjustment
- Specific feedback textarea
**Actions:** "Regenerate" primary button, "Cancel" secondary

#### Download Options
**Dropdown Menu:** Appears on button click
**Formats:**
- Markdown (.md)
- Plain Text (.txt)
- PDF (formatted)
- Copy to Clipboard
**Each option:** Icon + label, hover state

### D. Interactive Elements

**Buttons:**
- Primary: Rounded-lg, px-6 py-3, font-medium, with smooth transitions
- Secondary: Outlined variant with border
- Ghost: Text only with hover background
- Icon buttons: Square, p-2, rounded

**Form Inputs:**
- Border-2 on focus, rounded-lg
- Placeholder text with reduced opacity
- Helper text below in smaller font
- Error states with border treatment

**Loading States:**
- Skeleton screens for article preview
- Animated AI thinking indicator (pulsing dots or similar)
- Progress indication for generation

**Hover States:**
- Subtle scale (scale-[1.02]) on cards
- Background changes on interactive elements
- No animations on text/reading content

### E. Content Patterns

**Article Structure Template:**
1. Hook (relatable scenario)
2. Story development (personal narrative)
3. Product insight reveal
4. Practical application
5. Key takeaway summary

**Callout Boxes:**
- Product Lesson: Border-left accent, icon, italic
- Real-life Example: Subtle background, rounded corners
- Practice Tip: Different accent, actionable language

**Empty States:**
- Center-aligned with illustration
- Encouraging copy: "Your first product story starts here"
- Clear next action

---

## Images

**Hero Section Image:**
- Placement: Right side of hero, 40% width on desktop
- Description: Modern illustration or photo showing product managers collaborating, reviewing documentation, or a mentor-mentee knowledge sharing moment. Should feel warm, approachable, and professional. Think diverse team in casual office setting with laptops and sticky notes.
- Style: Contemporary, slightly illustrated or high-quality photography with natural lighting

**Empty State Illustrations:**
- Small, centered icons/illustrations for each empty state
- Consistent illustration style throughout

---

## Page Structure

1. **Fixed Navigation** (h-16)
2. **Hero Section** (py-20, with image)
3. **Main Editor Area** (two-column grid)
   - Left: Input form + Article preview (60%)
   - Right: Product lessons sidebar (40%, sticky)
4. **Footer** (py-12)
   - Quick links: How it Works, Examples, Tips for Better Articles
   - Social proof: Recent article count, user testimonials
   - Newsletter signup with context: "Weekly product thinking tips"
   - Support links, privacy policy

**Mobile Adaptation:**
- Stack all sections vertically
- Sidebar becomes collapsible drawer
- Hero image moves below headline
- Reduced padding throughout (py-8 instead of py-20)