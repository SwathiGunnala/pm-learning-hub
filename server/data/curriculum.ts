import type { Pillar, DailyChallenge } from "@shared/schema";

export const curriculum: Pillar[] = [
  {
    id: "foundations",
    title: "Foundations",
    description: "Master the basics of product management",
    icon: "BookOpen",
    color: "emerald",
    order: 1,
    units: [
      {
        id: "what-is-pm",
        pillarId: "foundations",
        title: "What is Product Management?",
        description: "Understand the PM role and its impact",
        icon: "Compass",
        order: 1,
        requiredXp: 0,
        lessons: [
          {
            id: "pm-role-intro",
            unitId: "what-is-pm",
            title: "The PM Role Explained",
            description: "What PMs actually do day-to-day",
            xpReward: 20,
            durationMinutes: 5,
            order: 1,
            content: [
              { type: "text", content: "A Product Manager is the person responsible for the 'what' and 'why' of a product. You don't code it, design it, or sell it directly - but you're responsible for its success." },
              { type: "tip", content: "Think of yourself as the CEO of the product (without the authority). You influence, you don't command." },
              { type: "text", content: "Your job is to deeply understand user problems, work with teams to build solutions, and make sure those solutions actually work in the market." },
              { type: "example", content: "When Slack's team built their chat tool, the PM wasn't writing code. They were asking: 'What makes team communication painful?' and 'How do we know if we've solved it?'" },
              { type: "quiz", content: "A PM's primary responsibility is to:", options: ["Write all the code for features", "Understand user problems and guide solutions", "Design the user interface", "Manage the engineering team"], correctIndex: 1, explanation: "PMs focus on understanding problems and guiding the team toward solutions - not doing the hands-on work themselves." },
              { type: "reflection", content: "Think about a product you use daily. What decisions do you think the PM had to make?" }
            ]
          },
          {
            id: "pm-vs-others",
            unitId: "what-is-pm",
            title: "PM vs. Other Roles",
            description: "How PM differs from engineering, design, and project management",
            xpReward: 20,
            durationMinutes: 4,
            order: 2,
            content: [
              { type: "text", content: "PMs often get confused with other roles. Let's clear it up:" },
              { type: "text", content: "**PM vs. Project Manager**: Project managers focus on timelines and execution. PMs focus on what to build and why." },
              { type: "text", content: "**PM vs. Designer**: Designers own the 'how it looks and feels'. PMs own the 'what problem are we solving'." },
              { type: "text", content: "**PM vs. Engineer**: Engineers build the solution. PMs define what success looks like." },
              { type: "tip", content: "Great PMs don't try to do everyone's job. They create clarity so everyone can do their best work." },
              { type: "quiz", content: "If a feature is behind schedule, who is typically responsible for adjusting the timeline?", options: ["Product Manager", "Project Manager", "Engineering Lead", "All of the above collaborate"], correctIndex: 3, explanation: "Schedule adjustments require collaboration. The PM provides context on priorities, the project manager coordinates, and engineering estimates impact." }
            ]
          },
          {
            id: "pm-mindset",
            unitId: "what-is-pm",
            title: "The PM Mindset",
            description: "How to think like a product manager",
            xpReward: 25,
            durationMinutes: 5,
            order: 3,
            content: [
              { type: "text", content: "Being a great PM isn't about frameworks or tools. It's about how you think." },
              { type: "text", content: "**Curiosity First**: Always ask 'why?' - about user behavior, business decisions, and technical constraints." },
              { type: "text", content: "**Comfort with Ambiguity**: You'll rarely have perfect information. Learn to make decisions anyway." },
              { type: "text", content: "**Bias for Learning**: Every launch is a hypothesis. Be ready to be wrong and learn fast." },
              { type: "example", content: "When Instagram launched Stories, they didn't know if users would adopt it. They launched, learned, iterated. That's the PM mindset in action." },
              { type: "tip", content: "The best PMs are wrong often - but they learn faster than everyone else." },
              { type: "reflection", content: "Think of a time you made a decision with incomplete information. What would you do differently now?" }
            ]
          }
        ]
      },
      {
        id: "understanding-users",
        pillarId: "foundations",
        title: "Understanding Users",
        description: "Learn to discover what users really need",
        icon: "Users",
        order: 2,
        requiredXp: 50,
        lessons: [
          {
            id: "user-research-basics",
            unitId: "understanding-users",
            title: "User Research 101",
            description: "How to learn what users actually need",
            xpReward: 25,
            durationMinutes: 6,
            order: 1,
            content: [
              { type: "text", content: "Users often can't tell you what they need. Your job is to uncover it anyway." },
              { type: "text", content: "**The Problem with Asking**: When asked, users describe solutions, not problems. 'I want a faster horse' vs. 'I need to get places quicker.'" },
              { type: "tip", content: "Never ask 'Would you use this feature?' Instead ask 'Tell me about the last time you faced this problem.'" },
              { type: "text", content: "**Observation > Opinion**: Watch what users do, not just what they say. Behavior reveals truth." },
              { type: "example", content: "When studying grocery shoppers, researchers noticed people removing items at checkout - revealing decision anxiety that surveys never captured." },
              { type: "quiz", content: "Which question would give you the most useful insight?", options: ["Would you pay for this feature?", "Do you like this design?", "Walk me through the last time you tried to solve this problem", "On a scale of 1-10, how important is this?"], correctIndex: 2, explanation: "Asking about past behavior reveals real struggles and workarounds that surveys miss." }
            ]
          },
          {
            id: "user-interviews",
            unitId: "understanding-users",
            title: "Running Great Interviews",
            description: "Techniques to uncover deep user insights",
            xpReward: 30,
            durationMinutes: 7,
            order: 2,
            content: [
              { type: "text", content: "A good user interview feels like a conversation, not an interrogation." },
              { type: "text", content: "**Start Broad**: 'Tell me about your day when you use [product category]'" },
              { type: "text", content: "**Follow Emotion**: When they show frustration or excitement, dig deeper. 'You mentioned that was annoying - tell me more.'" },
              { type: "text", content: "**Ask for Stories**: 'Can you walk me through a specific time when...' gets better answers than hypotheticals." },
              { type: "tip", content: "Silence is powerful. After they answer, wait 3 seconds. They'll often add the most valuable insight." },
              { type: "text", content: "**End with Magic Wand**: 'If you could wave a magic wand and fix one thing about this, what would it be?'" },
              { type: "reflection", content: "Think of a product you find frustrating. What questions would you want someone to ask you about it?" }
            ]
          }
        ]
      },
      {
        id: "pm-communication",
        pillarId: "foundations",
        title: "PM Communication",
        description: "Write and present with clarity and impact",
        icon: "MessageSquare",
        order: 3,
        requiredXp: 100,
        lessons: [
          {
            id: "writing-specs",
            unitId: "pm-communication",
            title: "Writing Clear Specs",
            description: "Documents that drive alignment and action",
            xpReward: 30,
            durationMinutes: 8,
            order: 1,
            content: [
              { type: "text", content: "A great spec answers: What are we building? Why? How do we know if it works?" },
              { type: "text", content: "**The One-Pager Structure**:\n1. Problem Statement\n2. Goal & Success Metrics\n3. Proposed Solution\n4. What's Out of Scope\n5. Open Questions" },
              { type: "tip", content: "If your spec is longer than 2 pages, you probably don't understand the problem well enough yet." },
              { type: "example", content: "Amazon's 6-page memos force clarity. If you can't explain it simply in writing, you can't build it well." },
              { type: "text", content: "**Write for Skimmers**: Use headers, bullets, and bold text. Most readers scan first." },
              { type: "quiz", content: "What's the most important section of a product spec?", options: ["Technical requirements", "Problem statement and success metrics", "Timeline", "Design mockups"], correctIndex: 1, explanation: "Without a clear problem and success metrics, you can't evaluate if any solution is the right one." }
            ]
          },
          {
            id: "why-now-framing",
            unitId: "pm-communication",
            title: "The 'Why Now' Framework",
            description: "Make your case for timing and urgency",
            xpReward: 25,
            durationMinutes: 5,
            order: 2,
            content: [
              { type: "text", content: "Good ideas fail because of bad timing. 'Why now?' is the question that separates shipped products from roadmap graveyards." },
              { type: "text", content: "**Answer These Questions**:\n- What's changed that makes this possible/necessary now?\n- What's the cost of waiting?\n- What window of opportunity might close?" },
              { type: "example", content: "Zoom existed for years before COVID. 'Why now?' became obvious in March 2020. But smart PMs were already positioned because they saw remote work trends building." },
              { type: "tip", content: "Connect 'why now' to trends your stakeholders already believe in. It makes your case easier." },
              { type: "reflection", content: "Think of a feature you want to build. What's your 'why now' story?" }
            ]
          },
          {
            id: "stakeholder-presentations",
            unitId: "pm-communication",
            title: "Presenting to Stakeholders",
            description: "Win buy-in with compelling presentations",
            xpReward: 30,
            durationMinutes: 6,
            order: 3,
            content: [
              { type: "text", content: "Most PM presentations fail because they're too long, too detailed, or miss what stakeholders actually care about." },
              { type: "text", content: "**The Pyramid Principle**: Lead with your conclusion, then support with evidence. Don't make people wait until slide 20 for the point." },
              { type: "tip", content: "Know your audience. Executives want strategy and impact. Engineers want technical details. Match your message to who's listening." },
              { type: "example", content: "Bad: 45 slides of research → recommendation. Good: 'We should do X because Y, and here's the data that supports it.'" },
              { type: "quiz", content: "When presenting to executives, you should:", options: ["Share all your research details", "Lead with the recommendation and impact", "Focus on technical implementation", "Read from your slides"], correctIndex: 1, explanation: "Executives have limited time. Lead with what you want them to know and decide, then provide supporting evidence." }
            ]
          }
        ]
      },
      {
        id: "roadmapping-basics",
        pillarId: "foundations",
        title: "Roadmapping",
        description: "Plan what to build and when",
        icon: "Map",
        order: 4,
        requiredXp: 150,
        lessons: [
          {
            id: "roadmap-types",
            unitId: "roadmapping-basics",
            title: "Types of Roadmaps",
            description: "Choose the right format for your audience",
            xpReward: 25,
            durationMinutes: 6,
            order: 1,
            content: [
              { type: "text", content: "Not all roadmaps are created equal. Different stakeholders need different views." },
              { type: "text", content: "**Feature Roadmap**: Lists specific features and timelines. Good for engineering, risky for external sharing." },
              { type: "text", content: "**Theme Roadmap**: Groups work by outcome ('Improve onboarding'). Good for executives and customers." },
              { type: "text", content: "**Now/Next/Later**: Shows priority without dates. Good for agile teams and avoiding commitment to specific timelines." },
              { type: "tip", content: "Never share a date-based roadmap externally. Dates slip. Share themes and outcomes instead." },
              { type: "quiz", content: "What's the safest roadmap type to share with customers?", options: ["Detailed feature timeline with dates", "Now/Next/Later with themes", "Sprint-level task breakdown", "Gantt chart"], correctIndex: 1, explanation: "Theme-based roadmaps communicate direction without making date commitments you might break." }
            ]
          },
          {
            id: "roadmap-prioritization",
            unitId: "roadmapping-basics",
            title: "Prioritizing Your Roadmap",
            description: "Decide what makes the cut",
            xpReward: 30,
            durationMinutes: 7,
            order: 2,
            content: [
              { type: "text", content: "Everything can't be priority one. Prioritization is the hardest and most important PM skill." },
              { type: "text", content: "**RICE Framework**:\n- Reach: How many users affected?\n- Impact: How much will it help them?\n- Confidence: How sure are you?\n- Effort: How much work?" },
              { type: "example", content: "Feature A reaches 10K users with high impact but takes 3 months. Feature B reaches 50K users with medium impact in 2 weeks. RICE helps you compare objectively." },
              { type: "tip", content: "Don't just prioritize what's loudest. The squeaky wheel isn't always the most valuable wheel." },
              { type: "reflection", content: "Think about your current roadmap. What's on it that shouldn't be? What's missing?" }
            ]
          },
          {
            id: "roadmap-communication",
            unitId: "roadmapping-basics",
            title: "Communicating Roadmap Changes",
            description: "Handle shifts without losing trust",
            xpReward: 25,
            durationMinutes: 5,
            order: 3,
            content: [
              { type: "text", content: "Roadmaps change. How you communicate changes determines whether people trust you or stop listening." },
              { type: "text", content: "**When Things Change**:\n- Explain why, not just what\n- Acknowledge the impact\n- Show what stays the same\n- Be proactive, don't hide" },
              { type: "example", content: "Bad: 'We're pushing Feature X.' Good: 'We learned Y from our beta, so we're adjusting to Z. Feature X moves to next quarter, but A and B are still on track.'" },
              { type: "tip", content: "Frequent small updates build more trust than infrequent big reveals." }
            ]
          }
        ]
      },
      {
        id: "metrics-analytics",
        pillarId: "foundations",
        title: "Metrics & Analytics",
        description: "Measure what matters",
        icon: "BarChart",
        order: 5,
        requiredXp: 200,
        lessons: [
          {
            id: "choosing-metrics",
            unitId: "metrics-analytics",
            title: "Choosing the Right Metrics",
            description: "Measure outcomes, not outputs",
            xpReward: 30,
            durationMinutes: 7,
            order: 1,
            content: [
              { type: "text", content: "What you measure shapes what you build. Choose wrong, and you'll optimize for the wrong thing." },
              { type: "text", content: "**Output vs. Outcome**:\n- Output: 'We shipped 10 features'\n- Outcome: 'User retention improved 15%'" },
              { type: "text", content: "**Vanity vs. Actionable**:\n- Vanity: 'We have 1M downloads'\n- Actionable: '40% of downloads become weekly active users'" },
              { type: "example", content: "Facebook's early north star wasn't 'monthly active users.' It was 'users who add 7 friends in 10 days.' That predicted long-term retention." },
              { type: "quiz", content: "Which is the best metric for a new feature's success?", options: ["Number of users who clicked on it", "Time spent using it", "Whether it solved the user's problem", "Number of bugs reported"], correctIndex: 2, explanation: "Ultimately, you want to know if the feature achieved its intended outcome, not just if people touched it." }
            ]
          },
          {
            id: "north-star-metric",
            unitId: "metrics-analytics",
            title: "The North Star Metric",
            description: "One number to rule them all",
            xpReward: 25,
            durationMinutes: 5,
            order: 2,
            content: [
              { type: "text", content: "A North Star Metric is the single metric that best captures the core value your product delivers." },
              { type: "text", content: "**Good North Stars**:\n- Spotify: Time spent listening\n- Airbnb: Nights booked\n- Slack: Messages sent in teams" },
              { type: "tip", content: "Your north star should correlate with both user value and business value. If users love it but you can't monetize it, that's a problem." },
              { type: "text", content: "**Warning Signs**: If your north star is gaming, or teams are hitting it but users aren't happy, you've chosen wrong." },
              { type: "reflection", content: "What would be the North Star Metric for a product you work on or use regularly?" }
            ]
          },
          {
            id: "ab-testing-basics",
            unitId: "metrics-analytics",
            title: "A/B Testing Fundamentals",
            description: "Make decisions with data, not opinions",
            xpReward: 30,
            durationMinutes: 6,
            order: 3,
            content: [
              { type: "text", content: "A/B testing removes guesswork by showing real user behavior, not hypothetical preferences." },
              { type: "text", content: "**Key Concepts**:\n- Control: The current experience\n- Treatment: The new variation\n- Statistical significance: Confidence that results aren't random" },
              { type: "example", content: "Google once tested 41 shades of blue for links. Obsessive? Maybe. But it led to hundreds of millions in additional revenue." },
              { type: "tip", content: "Don't stop tests too early. Wait for statistical significance or you'll make decisions on noise." },
              { type: "quiz", content: "Your A/B test shows the new design wins by 2% after 1 day. You should:", options: ["Ship it immediately", "Wait for statistical significance", "Declare the test a failure", "Run a different test"], correctIndex: 1, explanation: "Early results can be misleading. Wait until you have enough data to be confident the difference is real." }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "product-sense",
    title: "Product Sense Gym",
    description: "Build intuition through practice",
    icon: "Dumbbell",
    color: "orange",
    order: 2,
    units: [
      {
        id: "pattern-recognition",
        pillarId: "product-sense",
        title: "Pattern Recognition",
        description: "Spot what makes products succeed or fail",
        icon: "Eye",
        order: 1,
        requiredXp: 0,
        lessons: [
          {
            id: "spotting-patterns",
            unitId: "pattern-recognition",
            title: "Seeing What Others Miss",
            description: "Train your eye for product patterns",
            xpReward: 25,
            durationMinutes: 6,
            order: 1,
            content: [
              { type: "text", content: "Product sense is the ability to look at any product and understand the decisions behind it." },
              { type: "text", content: "**What to Look For**:\n- Why is this button here and not there?\n- What user behavior are they trying to encourage?\n- What trade-offs did they make?" },
              { type: "example", content: "Instagram puts the post button at the top, not bottom. Why? They want posting to feel intentional, not accidental. Every pixel is a decision." },
              { type: "tip", content: "Pick one app you use daily. Spend 5 minutes asking 'why?' about every design choice." },
              { type: "quiz", content: "Why do most e-commerce sites show 'Only 3 left!' on product pages?", options: ["They have inventory problems", "To create urgency and drive faster purchases", "Legal requirement", "Random feature"], correctIndex: 1, explanation: "Scarcity messaging uses loss aversion to encourage immediate action rather than 'I'll think about it.'" }
            ]
          },
          {
            id: "product-teardowns",
            unitId: "pattern-recognition",
            title: "Product Teardowns",
            description: "Analyze products like a PM",
            xpReward: 30,
            durationMinutes: 7,
            order: 2,
            content: [
              { type: "text", content: "A product teardown is systematic analysis of how a product works and why." },
              { type: "text", content: "**Teardown Framework**:\n1. Who is this for? (Target user)\n2. What job does it do? (Core value)\n3. How does it make money? (Business model)\n4. What's the hook? (Why users return)\n5. What would you change?" },
              { type: "example", content: "Duolingo Teardown: For language learners, makes learning a habit, freemium with premium for no ads, streaks create the hook. Brilliant gamification." },
              { type: "tip", content: "Do one teardown per week. In 6 months, you'll have product intuition that takes others years to build." },
              { type: "reflection", content: "Pick an app on your phone. Walk through the teardown framework for it." }
            ]
          }
        ]
      },
      {
        id: "trade-off-thinking",
        pillarId: "product-sense",
        title: "Trade-off Analysis",
        description: "Navigate competing priorities",
        icon: "Scale",
        order: 2,
        requiredXp: 75,
        lessons: [
          {
            id: "every-choice-costs",
            unitId: "trade-off-thinking",
            title: "Every Choice Has a Cost",
            description: "Understanding opportunity cost in product decisions",
            xpReward: 25,
            durationMinutes: 5,
            order: 1,
            content: [
              { type: "text", content: "In product, saying 'yes' to one thing means saying 'no' to others. There's always a trade-off." },
              { type: "text", content: "**Common Trade-offs**:\n- Speed vs. Quality\n- Simplicity vs. Power\n- New Users vs. Power Users\n- Short-term Revenue vs. Long-term Trust" },
              { type: "example", content: "Apple choosing no headphone jack: Lost feature convenience, gained waterproofing and wireless push. Clear trade-off, debatable outcome." },
              { type: "tip", content: "When making decisions, explicitly list what you're giving up. It forces honesty." },
              { type: "quiz", content: "Adding more features to a product always makes it better.", options: ["True", "False"], correctIndex: 1, explanation: "More features often mean more complexity, slower performance, and confused users. Sometimes less is more." }
            ]
          },
          {
            id: "scope-time-quality",
            unitId: "trade-off-thinking",
            title: "The Iron Triangle",
            description: "Scope, Time, Quality - pick two",
            xpReward: 25,
            durationMinutes: 5,
            order: 2,
            content: [
              { type: "text", content: "The Iron Triangle: You can have it fast, cheap, or good - but not all three. In product: scope, time, or quality." },
              { type: "text", content: "**Fixed Deadline?** Cut scope or accept lower quality.\n**Fixed Scope?** Push deadline or add resources.\n**Fixed Quality?** Reduce scope or extend time." },
              { type: "example", content: "Apple delayed the original iPhone by 6 months rather than ship with a plastic screen. They chose quality over time." },
              { type: "tip", content: "Know which constraint is truly fixed before negotiating the others." },
              { type: "reflection", content: "Think of a project that struggled. Which leg of the triangle was over-constrained?" }
            ]
          }
        ]
      },
      {
        id: "competitive-analysis",
        pillarId: "product-sense",
        title: "Competitive Analysis",
        description: "Learn from and differentiate against competitors",
        icon: "Target",
        order: 3,
        requiredXp: 125,
        lessons: [
          {
            id: "understanding-competitors",
            unitId: "competitive-analysis",
            title: "Know Your Competition",
            description: "Systematically analyze the competitive landscape",
            xpReward: 30,
            durationMinutes: 7,
            order: 1,
            content: [
              { type: "text", content: "Understanding competitors isn't about copying - it's about finding where you can win differently." },
              { type: "text", content: "**Competitive Analysis Framework**:\n- Who are they targeting?\n- What's their core value proposition?\n- What are they bad at?\n- Where are they heading?" },
              { type: "tip", content: "Your biggest competitor might not be who you think. Sometimes it's spreadsheets, or doing nothing at all." },
              { type: "example", content: "Slack's competitors weren't just HipChat and Teams. It was email, in-person meetings, and existing workflows." },
              { type: "quiz", content: "When analyzing competitors, you should focus on:", options: ["Copying their best features", "Finding gaps they're not serving well", "Matching their pricing exactly", "Using the same technology"], correctIndex: 1, explanation: "Differentiation comes from serving needs competitors miss, not from imitation." }
            ]
          },
          {
            id: "competitive-positioning",
            unitId: "competitive-analysis",
            title: "Positioning Against Competitors",
            description: "Define why you're the better choice",
            xpReward: 25,
            durationMinutes: 6,
            order: 2,
            content: [
              { type: "text", content: "Positioning answers: For whom? What problem? Why us over alternatives?" },
              { type: "text", content: "**Positioning Strategies**:\n- Head-to-head: 'We do X better than them'\n- Niche: 'We're built specifically for Y'\n- Blue ocean: 'We solve a problem they don't'" },
              { type: "example", content: "Notion didn't position against Google Docs on writing. They positioned as 'all-in-one workspace' - a new category." },
              { type: "tip", content: "Don't fight where competitors are strong. Find battlegrounds where you have natural advantages." },
              { type: "reflection", content: "How would you position your product against its biggest competitor?" }
            ]
          }
        ]
      },
      {
        id: "user-psychology",
        pillarId: "product-sense",
        title: "User Psychology",
        description: "Understand what drives user behavior",
        icon: "Brain",
        order: 4,
        requiredXp: 175,
        lessons: [
          {
            id: "cognitive-biases",
            unitId: "user-psychology",
            title: "Cognitive Biases in Product",
            description: "Use psychology ethically to improve UX",
            xpReward: 30,
            durationMinutes: 7,
            order: 1,
            content: [
              { type: "text", content: "Users don't always behave rationally. Understanding biases helps you design better experiences." },
              { type: "text", content: "**Key Biases**:\n- Anchoring: First number seen becomes the reference\n- Loss Aversion: Losses feel 2x as bad as gains feel good\n- Status Quo Bias: People prefer current state\n- Social Proof: People follow what others do" },
              { type: "example", content: "Booking.com: '3 people are looking at this right now' uses scarcity and social proof to drive urgency." },
              { type: "tip", content: "Use biases to help users make better decisions, not to manipulate them into bad ones." },
              { type: "quiz", content: "Showing '90% of users choose this option' is an example of:", options: ["Anchoring", "Loss aversion", "Social proof", "Status quo bias"], correctIndex: 2, explanation: "Showing what others do leverages social proof - people tend to follow the crowd." }
            ]
          },
          {
            id: "habit-formation",
            unitId: "user-psychology",
            title: "Building Habits",
            description: "Create products people return to daily",
            xpReward: 30,
            durationMinutes: 6,
            order: 2,
            content: [
              { type: "text", content: "Products that become habits win. The Hook Model explains how." },
              { type: "text", content: "**The Hook Model**:\n1. Trigger: Internal or external cue\n2. Action: Simple behavior to get reward\n3. Variable Reward: Unpredictable payoff\n4. Investment: User puts something in" },
              { type: "example", content: "Twitter: Boredom triggers → scroll → variable new tweets → post/follow (investment) → more triggers." },
              { type: "tip", content: "The best habits are formed when the product genuinely improves users' lives, not just captures attention." },
              { type: "reflection", content: "What habit-forming loop exists in a product you use daily?" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "mental-models",
    title: "Mental Models Lab",
    description: "Thinking frameworks for better decisions",
    icon: "Brain",
    color: "purple",
    order: 3,
    units: [
      {
        id: "first-principles",
        pillarId: "mental-models",
        title: "First Principles Thinking",
        description: "Break problems down to fundamentals",
        icon: "Atom",
        order: 1,
        requiredXp: 0,
        lessons: [
          {
            id: "first-principles-intro",
            unitId: "first-principles",
            title: "Thinking from Ground Zero",
            description: "Strip away assumptions to find truth",
            xpReward: 30,
            durationMinutes: 6,
            order: 1,
            content: [
              { type: "text", content: "First principles thinking means breaking down a problem to its most basic truths and building up from there." },
              { type: "text", content: "**Instead of**: 'Competitors charge $100, so we should too'\n**First Principles**: 'What does it actually cost to deliver? What value does it create?'" },
              { type: "example", content: "SpaceX didn't ask 'How do we buy cheaper rockets?' They asked 'What is a rocket made of? What do those materials cost?' Then they built their own for 10% of the price." },
              { type: "tip", content: "Ask 'Why?' five times in a row. By the fifth answer, you're usually at a fundamental truth." },
              { type: "quiz", content: "A competitor launches a feature. First principles thinking would have you:", options: ["Copy it quickly", "Ignore it", "Ask why users need it and if there's a better solution", "Survey users about the competitor"], correctIndex: 2, explanation: "Understanding the underlying need lets you find potentially better solutions, not just copy what exists." }
            ]
          }
        ]
      },
      {
        id: "second-order",
        pillarId: "mental-models",
        title: "Second-Order Thinking",
        description: "Consider the consequences of consequences",
        icon: "GitBranch",
        order: 2,
        requiredXp: 50,
        lessons: [
          {
            id: "beyond-obvious",
            unitId: "second-order",
            title: "Beyond the Obvious",
            description: "Think two steps ahead",
            xpReward: 30,
            durationMinutes: 5,
            order: 1,
            content: [
              { type: "text", content: "First-order thinking: What happens if we do X?\nSecond-order thinking: And then what happens after that?" },
              { type: "example", content: "First order: 'Adding a paywall will generate revenue.'\nSecond order: 'But engagement might drop, reducing word-of-mouth, making acquisition more expensive.'" },
              { type: "text", content: "Most PMs stop at first-order effects. The great ones play chess, not checkers." },
              { type: "tip", content: "For every decision, ask 'And then what?' at least twice." },
              { type: "reflection", content: "Think of a product decision that backfired. What second-order effect was missed?" }
            ]
          },
          {
            id: "unintended-consequences",
            unitId: "second-order",
            title: "Anticipating Unintended Consequences",
            description: "See around corners before problems happen",
            xpReward: 25,
            durationMinutes: 5,
            order: 2,
            content: [
              { type: "text", content: "Every product change creates ripple effects. Some you want, others you don't." },
              { type: "text", content: "**Ask These Questions**:\n- How might users game this?\n- What behavior are we accidentally incentivizing?\n- Who might be hurt by this change?" },
              { type: "example", content: "YouTube optimized for watch time. Unintended consequence: Sensational, addictive content won. They didn't plan for that." },
              { type: "tip", content: "Run a 'pre-mortem': Imagine the feature failed. Work backwards to figure out why." },
              { type: "quiz", content: "A reward program gives points for purchases. What unintended consequence might occur?", options: ["More purchases", "Users gaming the system with fake returns", "Higher customer satisfaction", "Reduced support tickets"], correctIndex: 1, explanation: "Incentive systems often get gamed. Users might buy and return items just to accumulate points." }
            ]
          }
        ]
      },
      {
        id: "inversion-thinking",
        pillarId: "mental-models",
        title: "Inversion",
        description: "Solve problems by thinking backwards",
        icon: "RefreshCw",
        order: 3,
        requiredXp: 100,
        lessons: [
          {
            id: "think-backwards",
            unitId: "inversion-thinking",
            title: "Thinking Backwards",
            description: "Avoid failure instead of seeking success",
            xpReward: 30,
            durationMinutes: 6,
            order: 1,
            content: [
              { type: "text", content: "Inversion: Instead of asking 'How do I succeed?' ask 'How do I fail?' Then avoid those things." },
              { type: "text", content: "**Why It Works**: It's often easier to identify what will definitely fail than what will definitely succeed." },
              { type: "example", content: "Warren Buffett: 'All I want to know is where I'm going to die, so I'll never go there.' Focus on avoiding catastrophic mistakes." },
              { type: "text", content: "**PM Application**: Instead of 'What makes users love this?' ask 'What would make users hate this?' Then don't do those things." },
              { type: "tip", content: "Before launching, list the top 5 ways this could go wrong. Address each one." },
              { type: "reflection", content: "Think of a feature. What would guarantee its failure? Are you avoiding those pitfalls?" }
            ]
          },
          {
            id: "kill-your-darlings",
            unitId: "inversion-thinking",
            title: "Kill Your Darlings",
            description: "Challenge your own best ideas",
            xpReward: 25,
            durationMinutes: 5,
            order: 2,
            content: [
              { type: "text", content: "The best PMs actively try to disprove their own ideas before investing resources." },
              { type: "text", content: "**Devil's Advocate Questions**:\n- What if I'm completely wrong about this?\n- What would have to be true for this to fail?\n- What am I ignoring because I want this to work?" },
              { type: "example", content: "Amazon's 'disagree and commit' culture. Argue hard against ideas, but once decided, commit fully." },
              { type: "tip", content: "The more you love an idea, the harder you should try to kill it." },
              { type: "quiz", content: "You're excited about a new feature. The best next step is:", options: ["Start building immediately", "Actively try to find reasons it won't work", "Get executive approval fast", "Hire more engineers"], correctIndex: 1, explanation: "Trying to disprove your idea early saves months of wasted work if there's a fatal flaw." }
            ]
          }
        ]
      },
      {
        id: "pareto-principle",
        pillarId: "mental-models",
        title: "The 80/20 Principle",
        description: "Focus on what moves the needle most",
        icon: "PieChart",
        order: 4,
        requiredXp: 150,
        lessons: [
          {
            id: "finding-leverage",
            unitId: "pareto-principle",
            title: "Finding High-Leverage Work",
            description: "20% of effort creates 80% of results",
            xpReward: 30,
            durationMinutes: 6,
            order: 1,
            content: [
              { type: "text", content: "The Pareto Principle: Roughly 80% of effects come from 20% of causes. Your job is to find that 20%." },
              { type: "text", content: "**In Product**:\n- 20% of features drive 80% of value\n- 20% of users generate 80% of revenue\n- 20% of bugs cause 80% of support tickets" },
              { type: "example", content: "Facebook found that users who added 7 friends in 10 days had dramatically higher retention. That one insight shaped all their early growth." },
              { type: "tip", content: "Before starting work, ask: 'Is this in the 20% that matters, or the 80% that doesn't?'" },
              { type: "quiz", content: "You have 10 feature requests. The 80/20 principle suggests:", options: ["Build all of them equally", "Find the 2 that would have the most impact", "Let users vote on all 10", "Build the easiest ones first"], correctIndex: 1, explanation: "Focus resources on the vital few, not the trivial many." }
            ]
          },
          {
            id: "ruthless-prioritization",
            unitId: "pareto-principle",
            title: "Ruthless Prioritization",
            description: "Saying no is your superpower",
            xpReward: 25,
            durationMinutes: 5,
            order: 2,
            content: [
              { type: "text", content: "Every 'yes' is a 'no' to something else. The best PMs are comfortable disappointing people." },
              { type: "text", content: "**How to Say No**:\n- Acknowledge the request's value\n- Explain what you're prioritizing instead and why\n- Leave the door open for the future" },
              { type: "example", content: "Steve Jobs: 'I'm as proud of the things we haven't done as the things we have done. Innovation is saying no to 1,000 things.'" },
              { type: "tip", content: "If everything is a priority, nothing is. Force rank your top 3." },
              { type: "reflection", content: "What should you stop doing to make room for higher-impact work?" }
            ]
          }
        ]
      },
      {
        id: "circle-competence",
        pillarId: "mental-models",
        title: "Circle of Competence",
        description: "Know what you know and what you don't",
        icon: "Circle",
        order: 5,
        requiredXp: 200,
        lessons: [
          {
            id: "know-your-limits",
            unitId: "circle-competence",
            title: "Know Your Limits",
            description: "Stay in your zone or learn before you leap",
            xpReward: 30,
            durationMinutes: 6,
            order: 1,
            content: [
              { type: "text", content: "Your circle of competence is the area where you have deep, real expertise. Outside it, you're guessing." },
              { type: "text", content: "**Three Zones**:\n- Inside: You truly understand. Operate confidently here.\n- Edge: You know enough to know what you don't know. Proceed carefully.\n- Outside: Unknown unknowns. Dangerous territory." },
              { type: "example", content: "Many tech companies fail in healthcare not because they're dumb, but because they underestimate how different the domain is." },
              { type: "tip", content: "The sign of expertise isn't confidence - it's knowing exactly where your knowledge ends." },
              { type: "quiz", content: "You're asked to lead a product in an unfamiliar domain. You should:", options: ["Fake it until you make it", "Decline immediately", "Accept but invest heavily in learning the domain first", "Just apply generic PM skills"], correctIndex: 2, explanation: "New domains require deep learning. Generic skills help, but domain expertise is what separates good from great." }
            ]
          },
          {
            id: "expanding-competence",
            unitId: "circle-competence",
            title: "Expanding Your Circle",
            description: "How to learn new domains effectively",
            xpReward: 25,
            durationMinutes: 5,
            order: 2,
            content: [
              { type: "text", content: "You can expand your circle, but it takes deliberate effort and humility." },
              { type: "text", content: "**How to Learn a New Domain**:\n- Find domain experts and learn from them\n- Read deeply, not widely at first\n- Start with 'what makes this different?' not 'how is it the same?'\n- Build slowly, validate constantly" },
              { type: "example", content: "When Stripe entered financial services, they hired banking experts and spent years learning regulations before building." },
              { type: "tip", content: "The fastest way to expand your circle is to admit what you don't know and ask experts to teach you." },
              { type: "reflection", content: "What domain adjacent to your work should you learn more about?" }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "stakeholder-mastery",
    title: "Stakeholder Mastery",
    description: "Work effectively with every team",
    icon: "Users",
    color: "blue",
    order: 4,
    units: [
      {
        id: "working-with-eng",
        pillarId: "stakeholder-mastery",
        title: "Working with Engineering",
        description: "Build trust and ship together",
        icon: "Code",
        order: 1,
        requiredXp: 0,
        lessons: [
          {
            id: "eng-partnership",
            unitId: "working-with-eng",
            title: "Engineers as Partners",
            description: "How to collaborate, not dictate",
            xpReward: 25,
            durationMinutes: 6,
            order: 1,
            content: [
              { type: "text", content: "The best PM-engineer relationships feel like true partnerships, not client-vendor dynamics." },
              { type: "text", content: "**What Engineers Want from PMs**:\n- Clear problem statements (not solutions)\n- Context on why this matters\n- Respect for technical constraints\n- Protection from scope creep" },
              { type: "tip", content: "Bring problems, not solutions. Engineers often have better ideas for 'how' than you do." },
              { type: "example", content: "Bad: 'Build me a button that does X.'\nGood: 'Users are struggling to find this action. What's the best way to surface it?'" },
              { type: "quiz", content: "An engineer says your feature will take 4 weeks, not 2. Your best response is:", options: ["Push back and demand 2 weeks", "Accept without question", "Understand the complexity and explore trade-offs together", "Go to their manager"], correctIndex: 2, explanation: "Understanding why helps you either find shortcuts or make informed trade-offs. Pushing without understanding breaks trust." }
            ]
          },
          {
            id: "technical-literacy",
            unitId: "working-with-eng",
            title: "Technical Literacy for PMs",
            description: "What you need to know (and what you don't)",
            xpReward: 25,
            durationMinutes: 5,
            order: 2,
            content: [
              { type: "text", content: "You don't need to code, but you need to understand technical trade-offs." },
              { type: "text", content: "**Know the Basics**:\n- Frontend vs. Backend\n- APIs and how systems connect\n- Databases and why some things are 'hard'\n- Technical debt and why it matters" },
              { type: "tip", content: "Ask engineers to explain things. Most love teaching if you're genuinely curious." },
              { type: "text", content: "**You Don't Need To**:\n- Write production code\n- Design system architecture\n- Debug code\n- Know every programming language" },
              { type: "reflection", content: "What technical concept do you wish you understood better? How could you learn it?" }
            ]
          }
        ]
      },
      {
        id: "working-with-sales",
        pillarId: "stakeholder-mastery",
        title: "Working with Sales",
        description: "Balance customer asks with product vision",
        icon: "TrendingUp",
        order: 2,
        requiredXp: 50,
        lessons: [
          {
            id: "sales-partnership",
            unitId: "working-with-sales",
            title: "Sales as Your Eyes and Ears",
            description: "Turn deal pressure into product insight",
            xpReward: 25,
            durationMinutes: 6,
            order: 1,
            content: [
              { type: "text", content: "Sales talks to prospects every day. They know what wins deals and what loses them. That's gold for PMs." },
              { type: "text", content: "**The Tension**: Sales wants features for specific deals. You need to build for the whole market." },
              { type: "tip", content: "When sales says 'We need X for this deal,' ask: 'What problem is the customer trying to solve?' The underlying need often has a better solution." },
              { type: "example", content: "Sales: 'Customer needs a dashboard.' PM digs deeper: Actually, they need confidence their data is being processed. A simple status indicator solved it - 2 hours, not 2 weeks." },
              { type: "quiz", content: "Sales asks for a feature for a $500K deal closing Friday. You should:", options: ["Build it immediately", "Refuse and explain the roadmap", "Understand the need, explore quick solutions, be honest about trade-offs", "Escalate to leadership"], correctIndex: 2, explanation: "Neither blind compliance nor rigid refusal. Explore the real need and find the best path forward together." }
            ]
          }
        ]
      },
      {
        id: "working-with-customers",
        pillarId: "stakeholder-mastery",
        title: "Working with Customers",
        description: "Listen deeply, promise carefully",
        icon: "Heart",
        order: 3,
        requiredXp: 100,
        lessons: [
          {
            id: "customer-conversations",
            unitId: "working-with-customers",
            title: "Talking to Customers",
            description: "Get insights without making promises",
            xpReward: 25,
            durationMinutes: 5,
            order: 1,
            content: [
              { type: "text", content: "Customer conversations are a superpower - if you do them right." },
              { type: "text", content: "**Do**:\n- Listen more than you talk\n- Ask about their problems, not your solutions\n- Take detailed notes\n- Thank them for their time" },
              { type: "text", content: "**Don't**:\n- Promise features or timelines\n- Defend current product weaknesses\n- Lead the witness ('Wouldn't X be great?')\n- Only talk to happy customers" },
              { type: "tip", content: "The most valuable customers to talk to are recent churns. They'll tell you truths others won't." },
              { type: "reflection", content: "When was the last time you talked to a customer? What did you learn?" }
            ]
          },
          {
            id: "managing-expectations",
            unitId: "working-with-customers",
            title: "Managing Customer Expectations",
            description: "Under-promise, over-deliver",
            xpReward: 25,
            durationMinutes: 5,
            order: 2,
            content: [
              { type: "text", content: "The gap between expectation and reality determines satisfaction. Manage the expectation, not just the product." },
              { type: "text", content: "**Setting Expectations**:\n- Be clear about what's included and what's not\n- Give time ranges, not specific dates\n- Communicate changes proactively\n- Follow up even when there's no news" },
              { type: "example", content: "Amazon says delivery is 3-5 days, then delivers in 2. Delight. If they said 2 days and delivered in 3, disappointment - even though 3 is objectively good." },
              { type: "tip", content: "When things go wrong, tell customers before they discover it themselves." },
              { type: "quiz", content: "A customer asks when a feature will ship. The best response is:", options: ["Give them an exact date", "Say 'soon' without details", "Explain your priorities and give a rough timeframe", "Tell them to check the roadmap"], correctIndex: 2, explanation: "Context helps customers understand your thinking. Vague promises or over-commitments both erode trust." }
            ]
          }
        ]
      },
      {
        id: "executive-alignment",
        pillarId: "stakeholder-mastery",
        title: "Executive Alignment",
        description: "Get leadership buy-in and support",
        icon: "Crown",
        order: 4,
        requiredXp: 150,
        lessons: [
          {
            id: "speaking-exec-language",
            unitId: "executive-alignment",
            title: "Speaking Executive Language",
            description: "Frame product work in business terms",
            xpReward: 30,
            durationMinutes: 6,
            order: 1,
            content: [
              { type: "text", content: "Executives don't care about features. They care about outcomes: revenue, growth, risk, competitive position." },
              { type: "text", content: "**Translate Your Work**:\n- 'New onboarding flow' → 'Reduce time-to-value, improve activation by 20%'\n- 'Bug fixes' → 'Reduce churn risk from frustrated users'\n- 'Technical debt' → 'Reduce development cost and increase velocity'" },
              { type: "tip", content: "Lead with the 'so what.' Start with impact, then explain the work." },
              { type: "example", content: "Bad: 'We're building a new checkout flow.'\nGood: 'We're targeting a 15% increase in conversion which means $2M additional revenue. Here's how.'" },
              { type: "quiz", content: "When presenting to executives, you should:", options: ["Explain all technical details first", "Lead with business impact and metrics", "Focus on how hard the work was", "Compare to competitors only"], correctIndex: 1, explanation: "Executives think in business outcomes. Technical details are support, not the lead." }
            ]
          },
          {
            id: "managing-up",
            unitId: "executive-alignment",
            title: "Managing Up Effectively",
            description: "Keep leadership informed and aligned",
            xpReward: 25,
            durationMinutes: 5,
            order: 2,
            content: [
              { type: "text", content: "Managing up isn't politics - it's making sure leadership has what they need to support you." },
              { type: "text", content: "**What Executives Want**:\n- No surprises (especially bad ones)\n- Clear status on important initiatives\n- Confidence you have things under control\n- Early warning on risks" },
              { type: "example", content: "The '15/5 rule': Send a 15-second update that takes 5 minutes to read. If they want more, they'll ask." },
              { type: "tip", content: "When you surface problems, always bring potential solutions. Don't just dump problems on their desk." },
              { type: "reflection", content: "How does your leadership currently perceive your work? What could you do to improve that perception?" }
            ]
          },
          {
            id: "navigating-disagreement",
            unitId: "executive-alignment",
            title: "When You Disagree with Leadership",
            description: "Push back productively, then commit",
            xpReward: 30,
            durationMinutes: 6,
            order: 3,
            content: [
              { type: "text", content: "Sometimes leadership is wrong. Your job is to voice disagreement constructively, then support the decision either way." },
              { type: "text", content: "**How to Disagree Well**:\n- Come with data, not just opinions\n- Propose alternatives, don't just criticize\n- Pick your battles - not everything is worth fighting\n- Know when to let go" },
              { type: "example", content: "Amazon's 'disagree and commit': Argue passionately, but once decided, support the decision 100%." },
              { type: "tip", content: "Frame disagreement as 'I'm worried about X' not 'You're wrong about X.'" },
              { type: "quiz", content: "Your CEO wants a feature you think is wrong. You should:", options: ["Build it without question", "Refuse to build it", "Share your concerns with data, then commit to the decision", "Quietly slow-roll the project"], correctIndex: 2, explanation: "Voice concerns professionally, but once the decision is made, execute with full commitment." }
            ]
          }
        ]
      },
      {
        id: "cross-functional-leadership",
        pillarId: "stakeholder-mastery",
        title: "Cross-Functional Leadership",
        description: "Lead without authority across teams",
        icon: "Network",
        order: 5,
        requiredXp: 200,
        lessons: [
          {
            id: "influence-without-authority",
            unitId: "cross-functional-leadership",
            title: "Influence Without Authority",
            description: "Lead through persuasion, not power",
            xpReward: 30,
            durationMinutes: 7,
            order: 1,
            content: [
              { type: "text", content: "PMs have responsibility without authority. You can't tell anyone what to do - you have to convince them." },
              { type: "text", content: "**Sources of Influence**:\n- Expertise: Know your domain deeply\n- Relationships: Build trust before you need it\n- Vision: Paint a compelling picture of the future\n- Reciprocity: Help others first" },
              { type: "example", content: "Great PMs are like orchestra conductors. They don't play every instrument, but they bring everyone together to create something beautiful." },
              { type: "tip", content: "Before asking for something, ask: 'What does this person care about? How does my request help them?'" },
              { type: "quiz", content: "The best way to influence a skeptical engineer is:", options: ["Pull rank and escalate", "Promise them rewards", "Understand their concerns and address them", "Go around them to their manager"], correctIndex: 2, explanation: "Understanding and addressing concerns builds trust. Power plays destroy it." }
            ]
          },
          {
            id: "building-coalitions",
            unitId: "cross-functional-leadership",
            title: "Building Coalitions",
            description: "Get multiple teams aligned",
            xpReward: 25,
            durationMinutes: 5,
            order: 2,
            content: [
              { type: "text", content: "Big initiatives require multiple teams. Your job is to build alignment across all of them." },
              { type: "text", content: "**Coalition Building Steps**:\n1. Identify all stakeholders early\n2. Understand each one's goals and concerns\n3. Find win-win framings\n4. Build support one conversation at a time\n5. Create shared ownership" },
              { type: "example", content: "Before Amazon launches a major feature, PMs do a 'bar raiser' review where all stakeholders pressure-test the plan." },
              { type: "tip", content: "Never surprise stakeholders in meetings. Align 1-on-1 first, then use meetings to confirm alignment." },
              { type: "reflection", content: "Think of a cross-functional project that struggled. What coalition-building was missing?" }
            ]
          },
          {
            id: "resolving-conflicts",
            unitId: "cross-functional-leadership",
            title: "Resolving Team Conflicts",
            description: "Navigate disagreements productively",
            xpReward: 30,
            durationMinutes: 6,
            order: 3,
            content: [
              { type: "text", content: "Conflict between teams is normal. How you handle it determines whether it becomes productive or toxic." },
              { type: "text", content: "**Conflict Resolution Framework**:\n1. Understand both sides fully (steel-man each position)\n2. Find the underlying interest behind positions\n3. Look for creative solutions that address both\n4. Escalate only when truly stuck" },
              { type: "example", content: "Engineering wants more time for quality. Sales wants faster delivery. Solution: Ship an MVP to one customer first, then polish. Both needs addressed." },
              { type: "tip", content: "Most conflicts come from different goals or different information. Align on goals and share information before proposing solutions." },
              { type: "quiz", content: "Design and Engineering disagree on an approach. You should:", options: ["Side with whoever is louder", "Escalate immediately to leadership", "Understand both perspectives and look for a third option", "Let them fight it out"], correctIndex: 2, explanation: "Understanding both sides often reveals a solution neither had considered." }
            ]
          }
        ]
      }
    ]
  },
  {
    id: "advanced-leadership",
    title: "Advanced Leadership",
    description: "Lead products and teams at scale",
    icon: "Crown",
    color: "amber",
    order: 5,
    units: [
      {
        id: "product-strategy",
        pillarId: "advanced-leadership",
        title: "Product Strategy",
        description: "Set direction, not just roadmaps",
        icon: "Map",
        order: 1,
        requiredXp: 0,
        lessons: [
          {
            id: "strategy-vs-tactics",
            unitId: "product-strategy",
            title: "Strategy vs. Tactics",
            description: "Know the difference and when to focus where",
            xpReward: 30,
            durationMinutes: 6,
            order: 1,
            content: [
              { type: "text", content: "Strategy is deciding which mountain to climb. Tactics is planning the route up." },
              { type: "text", content: "**Strategy Questions**:\n- What market are we in?\n- How will we win?\n- What will we NOT do?" },
              { type: "text", content: "**Tactics Questions**:\n- What features ship this quarter?\n- How do we measure success?\n- Who owns what?" },
              { type: "example", content: "Spotify's strategy: Be the world's audio platform. Tactics: Launch podcasts, expand to 180 countries, create personalized playlists." },
              { type: "tip", content: "If you can't explain your strategy in one sentence, you don't have one." },
              { type: "quiz", content: "'Ship user profiles by Q3' is an example of:", options: ["Strategy", "Tactics", "Vision", "Mission"], correctIndex: 1, explanation: "It's a specific action with a timeline - that's tactics. Strategy would be 'Win through community and social features.'" }
            ]
          }
        ]
      },
      {
        id: "product-vision",
        pillarId: "advanced-leadership",
        title: "Crafting Vision",
        description: "Inspire teams with a compelling future",
        icon: "Sparkles",
        order: 2,
        requiredXp: 75,
        lessons: [
          {
            id: "vision-that-motivates",
            unitId: "product-vision",
            title: "Vision That Motivates",
            description: "Create a future people want to build",
            xpReward: 30,
            durationMinutes: 5,
            order: 1,
            content: [
              { type: "text", content: "A great product vision makes people feel like they're building something that matters." },
              { type: "text", content: "**Good Vision Traits**:\n- Ambitious but achievable\n- Customer-focused, not feature-focused\n- Clear enough to guide decisions\n- Inspiring enough to motivate" },
              { type: "example", content: "Airbnb: 'Belong anywhere.' Not 'Rent homes online.' The vision is about human connection, not transactions." },
              { type: "tip", content: "Test your vision: Can a new engineer use it to decide between two approaches? If not, it's too vague." },
              { type: "reflection", content: "What's the vision for your product? How would you make it more compelling?" }
            ]
          }
        ]
      }
    ]
  }
];

export const dailyChallenges: DailyChallenge[] = [
  {
    id: "dc-eng-1",
    category: "Engineering",
    title: "The Scope Creep",
    scenario: "You're two weeks into a sprint. Engineering lead says a 'small' feature addition will add 5 days. The stakeholder who requested it is your CEO.",
    question: "How do you handle this situation?",
    stakeholder: "Engineering",
    xpReward: 15,
  },
  {
    id: "dc-eng-2",
    category: "Engineering",
    title: "The Technical Debt Debate",
    scenario: "Your lead engineer wants to spend 3 weeks refactoring code instead of shipping new features. They say it'll make everything faster later. Your VP wants visible progress.",
    question: "How do you navigate this trade-off?",
    stakeholder: "Engineering",
    xpReward: 15,
  },
  {
    id: "dc-sales-1",
    category: "Sales",
    title: "The Big Deal Feature",
    scenario: "Sales team says they'll lose a $500K deal unless you build a custom integration by end of month. Your roadmap is already packed.",
    question: "What's your approach?",
    stakeholder: "Sales",
    xpReward: 15,
  },
  {
    id: "dc-sales-2",
    category: "Sales",
    title: "The Promise That Was Made",
    scenario: "You discover that a sales rep promised a feature to a customer - a feature that's not on your roadmap and would take 2 months to build.",
    question: "How do you handle this internally and externally?",
    stakeholder: "Sales",
    xpReward: 15,
  },
  {
    id: "dc-support-1",
    category: "Customer Support",
    title: "The Ticket Flood",
    scenario: "Support tickets about a 'confusing' feature have tripled this week. The feature was your idea and leadership praised it at launch.",
    question: "What do you do?",
    stakeholder: "Support",
    xpReward: 15,
  },
  {
    id: "dc-customer-1",
    category: "Customers",
    title: "The Churn Threat",
    scenario: "Your largest customer (20% of revenue) says they'll leave unless you add a feature that would make the product worse for everyone else.",
    question: "How do you respond?",
    stakeholder: "Customers",
    xpReward: 15,
  },
  {
    id: "dc-customer-2",
    category: "Customers",
    title: "The Feature Contradiction",
    scenario: "Power users want more advanced features. New users say the product is already too complex. Both segments are equally valuable.",
    question: "How do you solve this tension?",
    stakeholder: "Customers",
    xpReward: 15,
  },
  {
    id: "dc-marketing-1",
    category: "Marketing",
    title: "The Launch Pressure",
    scenario: "Marketing has scheduled a big product announcement for next week. Engineering says the feature won't be stable until the week after.",
    question: "What's your move?",
    stakeholder: "Marketing",
    xpReward: 15,
  },
  {
    id: "dc-prioritization-1",
    category: "Prioritization",
    title: "The Roadmap Conflict",
    scenario: "You have capacity for 2 features this quarter. Option A has strong data support but low exec interest. Option B is the CEO's pet project but data is unclear.",
    question: "How do you decide and communicate?",
    xpReward: 15,
  },
  {
    id: "dc-prioritization-2",
    category: "Prioritization",
    title: "The Quick Win vs. Big Bet",
    scenario: "You can ship 5 small improvements that users are asking for, or 1 major feature that could transform the product. Resources don't allow both.",
    question: "How do you think through this decision?",
    xpReward: 15,
  },
  {
    id: "dc-strategy-1",
    category: "Strategy",
    title: "The Competitor Move",
    scenario: "Your main competitor just launched a feature that took you 6 months to plan. It's getting buzz on social media. Your CEO asks 'What's our response?'",
    question: "What do you say and what do you do?",
    xpReward: 15,
  },
  {
    id: "dc-pm-1",
    category: "Other PMs",
    title: "The Dependency Dance",
    scenario: "Another PM's team needs to build an API for your feature. They keep deprioritizing it because it doesn't help their metrics.",
    question: "How do you unblock this?",
    stakeholder: "Other PMs",
    xpReward: 15,
  }
];
