import type { CaseStudy } from "@shared/schema";

export const caseStudies: CaseStudy[] = [
  {
    id: "slack-pivot",
    title: "How Slack Became Essential for Teams",
    company: "Slack",
    industry: "SaaS",
    outcome: "win",
    preview: "From a gaming company's internal tool to a $27.7B acquisition by Salesforce.",
    readTime: "8 min",
    difficulty: "beginner",
    content: `Stewart Butterfield had already experienced one of tech's most famous pivots. His gaming company Ludicorp created a photo-sharing tool for players that became Flickr. History would repeat itself.

In 2009, Butterfield started Tiny Speck to build Glitch, a browser-based multiplayer game. The game was quirky, creative, and ultimately unsuccessful. But the team had built something else: an internal communication tool to coordinate their distributed team.

**The Pivot Moment**

When Glitch shut down in 2012, the team looked at what they had built. Their internal chat tool was actually pretty good. More importantly, it solved a real problem they experienced every day.

"We were trying to figure out what to do with our lives," Butterfield later recalled. "We looked at the tool we built and thought: this is actually useful."

**What Made Slack Different**

1. **Search that actually worked** - Unlike email, you could find anything instantly
2. **Channels over DMs** - Transparency by default, reducing information silos
3. **Integrations everywhere** - Connected to every tool teams already used
4. **Delightful details** - Custom emoji, loading messages, personality throughout

**The Growth Playbook**

Slack didn't just grow - it spread virally within organizations:
- One team would adopt it
- They'd need to collaborate with another team
- That team would see how much faster communication was
- They'd adopt it too
- Eventually, IT would standardize on it

**The Lesson**

Sometimes the side project is the main project. Pay attention to what you're building to solve your own problems - it might be more valuable than what you set out to build.`,
    lessons: [
      "Internal tools built to solve your own pain points can become products",
      "Viral growth within organizations happens when the product visibly improves collaboration",
      "Delightful details create emotional connection and word-of-mouth",
    ],
  },
  {
    id: "google-plus-failure",
    title: "Why Google+ Failed Despite Google's Resources",
    company: "Google",
    industry: "Social Media",
    outcome: "fail",
    preview: "Even with billions of users and massive resources, Google couldn't crack social networking.",
    readTime: "10 min",
    difficulty: "intermediate",
    content: `In 2011, Google was scared. Facebook was growing at an alarming rate, and Google's previous social attempts (Orkut, Buzz, Wave) had all failed. They needed to respond.

Google+ launched with massive resources, top engineering talent, and integration across all Google properties. By any objective measure, it should have succeeded.

**The Fatal Flaws**

1. **Forced Integration** - Google+ wasn't optional. Want to comment on YouTube? Need a Google+ account. Want to see who +1'd something? Google+. This created resentment, not engagement.

2. **No Clear Purpose** - Facebook was for friends. Twitter was for public conversation. LinkedIn was for professional networking. Google+ was... everything? Nothing?

3. **Circles Complexity** - The signature feature let you organize contacts into circles. Clever in theory, exhausting in practice. Users didn't want to categorize every relationship.

4. **The Empty Room Problem** - Google+ launched to fanfare, but early adopters found... nothing. No friends, no content, no reason to return. Network effects work both ways.

**What Google Missed**

Social networks aren't features to be built - they're communities to be grown. You can't shortcut community building with integration or features.

Users didn't need another place to share. They needed a reason to switch. Google never provided one.

**The Lesson**

Resources and distribution aren't enough. You need to solve a real problem better than existing solutions. "We're Google" isn't a value proposition.`,
    lessons: [
      "Forced adoption breeds resentment, not engagement",
      "Social products need a clear, differentiated purpose",
      "You cannot shortcut community building with features or distribution",
    ],
  },
  {
    id: "spotify-freemium",
    title: "Spotify's Freemium Model That Changed Music",
    company: "Spotify",
    industry: "Entertainment",
    outcome: "win",
    preview: "How giving away music for free became the path to profitability.",
    readTime: "12 min",
    difficulty: "intermediate",
    content: `In 2008, the music industry was in crisis. Piracy was rampant. iTunes proved people would pay for digital music, but only per song. The industry needed a new model.

Daniel Ek had a counterintuitive idea: what if music was free?

**The Freemium Gamble**

Spotify's pitch to labels was audacious: let users stream any song for free, with ads. The theory was that free access would convert pirates into paying customers over time.

The labels were skeptical. Give away music for free? That's what pirates did.

But Spotify understood something crucial: the real competition wasn't other paid services. It was piracy. And you don't beat free with expensive.

**The Conversion Funnel**

Free tier users got:
- Access to all music
- Shuffle-only on mobile
- Ads between songs
- Lower audio quality

Premium users got:
- No ads
- Offline downloads
- On-demand playback
- Better audio quality

The friction points were carefully chosen. Enough value in free to hook users. Enough annoyance to drive upgrades.

**Why It Worked**

1. **Removed piracy's main advantage** - Free access to everything
2. **Created habit, then upgraded it** - Users got hooked on convenience before paying
3. **Made paying feel like an upgrade, not a requirement** - Positive framing
4. **Playlists created lock-in** - Years of curation made switching painful

**The Result**

By 2023, Spotify had 226 million paying subscribers, with a 45% conversion rate from free to paid - extraordinary for freemium.

**The Lesson**

Sometimes the way to beat free competitors is to be free yourself - then provide enough value that users want to pay for the upgrade.`,
    lessons: [
      "Compete with free by being free, then upsell the experience",
      "Strategic friction in free tiers drives conversion without alienating users",
      "User investment (playlists, history) creates powerful switching costs",
    ],
  },
  {
    id: "quibi-lesson",
    title: "Quibi's $1.75 Billion Lesson",
    company: "Quibi",
    industry: "Entertainment",
    outcome: "fail",
    preview: "Why short-form premium video failed despite massive funding and star power.",
    readTime: "9 min",
    difficulty: "beginner",
    content: `Jeffrey Katzenberg was a Hollywood legend. Meg Whitman had run eBay and HP. Together, they raised $1.75 billion to launch Quibi in April 2020.

Six months later, it was dead.

**The Thesis**

Quibi believed people wanted premium, short-form content for their commutes. Episodes under 10 minutes. Movie-quality production. Mobile-only viewing.

The logic seemed sound: YouTube proved short-form worked. Netflix proved premium worked. Combine them!

**What Went Wrong**

1. **The Commute Disappeared** - Quibi launched during COVID-19. No commutes meant no captive audience for short content. But this wasn't the real problem.

2. **Solving a Problem That Didn't Exist** - When people have 10 minutes, they scroll TikTok, Instagram, or Twitter. These are free, infinite, and social. Quibi was paid, finite, and solitary.

3. **No Sharing** - You couldn't screenshot or share clips. In an era of memes and social media, Quibi's content existed in a vacuum.

4. **Hollywood Logic, Not Internet Logic** - Katzenberg thought quality content was enough. But the internet values relevance, timeliness, and shareability over production value.

**The Deeper Lesson**

Quibi assumed that putting premium content in a new format would create demand. But format changes need to serve user behavior, not fight it.

Short-form content works on TikTok because it's:
- Free
- Endless (algorithmic feed)
- Social (comments, shares, duets)
- Created by peers (relatable)

Quibi was none of these things.

**The Lesson**

Don't combine two things that work separately and assume they'll work together. Understand why each thing works, and whether those reasons are compatible.`,
    lessons: [
      "Timing matters, but product-market fit matters more",
      "Combining two successful models doesn't guarantee success",
      "Social sharing is table stakes for modern media products",
    ],
  },
  {
    id: "notion-community",
    title: "Notion's Community-Led Growth",
    company: "Notion",
    industry: "Productivity",
    outcome: "win",
    preview: "How Notion built a passionate community that became their best marketing channel.",
    readTime: "7 min",
    difficulty: "beginner",
    content: `In 2018, Notion nearly died. The company had run out of money and relocated to Kyoto, Japan to extend their runway. The team was down to 4 people.

By 2021, Notion was valued at $10 billion.

**The Template Ecosystem**

Notion's breakthrough wasn't a feature - it was flexibility. Users could build almost anything: project trackers, wikis, databases, websites.

This flexibility spawned an ecosystem. Users started creating and sharing templates. Some started selling them. Others built YouTube channels teaching Notion.

**Community as Product**

Notion leaned into this. They:
- Highlighted power users and their creations
- Invited users to become "Notion Ambassadors"
- Featured community templates in the product
- Let the community define use cases

The community became the marketing department, support team, and product educators - all for free.

**Why It Worked**

1. **Flexibility enabled creativity** - Users could make Notion their own
2. **Sharing was rewarding** - Template creators gained followers and sometimes income
3. **Investment created loyalty** - Hours spent customizing = high switching costs
4. **Word of mouth scaled** - Every template shared was an ad for Notion

**The Counter-Intuitive Insight**

Notion's learning curve was a feature, not a bug. The complexity that made it hard to start also made it powerful enough to inspire devotion.

Users who conquered the learning curve became evangelists. They'd invested time and wanted to share what they'd built.

**The Lesson**

Sometimes your power users are your best growth channel. Give them tools to create, reasons to share, and recognition for their work.`,
    lessons: [
      "Flexibility creates an ecosystem of user-generated solutions",
      "Power users can become your most effective marketing channel",
      "Complexity that rewards investment creates loyal advocates",
    ],
  },
  {
    id: "wework-catastrophe",
    title: "WeWork's Overvaluation Catastrophe",
    company: "WeWork",
    industry: "Real Estate",
    outcome: "fail",
    preview: "When 'community-adjusted EBITDA' and mission statements couldn't hide fundamental business problems.",
    readTime: "15 min",
    difficulty: "advanced",
    content: `At its peak in January 2019, WeWork was valued at $47 billion. By the end of that year, the IPO was cancelled, the CEO was gone, and the company was fighting for survival.

It remains one of the most dramatic corporate implosions in history.

**The Vision**

Adam Neumann didn't want to build a real estate company. He wanted to "elevate the world's consciousness." WeWork wasn't renting desks - it was building community, enabling entrepreneurship, changing how people work.

The mission attracted believers. SoftBank invested billions. The company grew explosively.

**The Reality**

Under the mission statements was a straightforward business: sign long-term leases, build out spaces, rent desks short-term. The spread was the profit.

But the math never worked:
- Long-term lease obligations: $47 billion
- Losses: $1.9 billion in 2018 alone
- Path to profitability: unclear

**The Warning Signs**

1. **"Community-Adjusted EBITDA"** - WeWork invented metrics that excluded basically all their costs. It was profit if you ignored everything that made it not profitable.

2. **Self-Dealing** - Neumann owned buildings he leased to WeWork. He trademarked "We" and charged the company $5.9 million to use it.

3. **Beer and Parties as Strategy** - The culture emphasized fun over fundamentals. Unlimited beer, summer camps, and a general vibe of "crushing it" replaced unit economics discussions.

**The Collapse**

When WeWork filed for its IPO, the S-1 exposed everything. Analysts saw the losses, the governance issues, the conflicts of interest. The valuation dropped from $47B to $8B in weeks.

**The Lesson**

Narrative can carry a company far, but not forever. Eventually, someone asks: "But do you make money?" If you've been hiding the answer with creative metrics and mission statements, the reckoning will be severe.`,
    lessons: [
      "Creative metrics that hide losses eventually get exposed",
      "Mission and culture cannot substitute for sound unit economics",
      "Governance issues are red flags that compound over time",
    ],
  },
];
