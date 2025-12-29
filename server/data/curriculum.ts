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
