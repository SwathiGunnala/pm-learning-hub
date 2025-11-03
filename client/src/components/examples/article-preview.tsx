import { ArticlePreview } from "../article-preview";

export default function ArticlePreviewExample() {
  const mockArticle = {
    title: "Why Your Feature Backlog Feels Like a Packed Closet",
    content: `You know that feeling when you open your closet and stuff just falls out? That's exactly what happened to me last spring. I had crammed so many things in there - winter coats, summer dresses, shoes I hadn't worn in years - that I couldn't even find my favorite jacket anymore.

[EXAMPLE] Picture this: It's Monday morning, you're already running late, and you need that one specific shirt. But instead of grabbing it and going, you're now in a full wrestling match with hangers, boxes, and that random scarf you forgot you owned. Sound familiar?

This is basically what happens with product backlogs. We keep adding more ideas, more features, more "nice-to-haves" until we can't even see what's actually important anymore.

[LESSON] Just like a cluttered closet makes it impossible to find what you need, an overstuffed backlog makes it nearly impossible to identify what truly matters for your users right now.

Here's what changed for me - both with my closet and my product thinking. I had to get real about what I actually used versus what I just kept "in case." With my closet, I started with a simple rule: if I hadn't worn it in six months, it went into a donation pile. Not thrown away, just moved out of my immediate space.

The same principle works beautifully for product backlogs. Create an "archive" for ideas that aren't priorities right now. They're not dead - they're just not cluttering your view of what matters today.

[LESSON] Prioritization isn't about saying no forever - it's about saying "not right now" so you can focus on what will make the biggest difference for your users today.

Think about it this way: every item in your backlog is competing for attention. When you have 200 items, each one gets 0.5% of your focus. When you have 20 carefully chosen items, each gets 5% of your attention. That's ten times more mental energy available to understand and solve the real problems.`,
    readingTime: 4,
    gradeLevel: 7,
    lessons: [
      "An overstuffed backlog obscures what truly matters, just like a cluttered closet hides your favorite items",
      "Prioritization means saying 'not right now' to create focus, not rejecting ideas forever",
      "Fewer items in your backlog means more mental energy per item to solve real user problems"
    ]
  };

  return (
    <div className="p-6 max-w-4xl">
      <ArticlePreview 
        article={mockArticle}
        isGenerating={false}
        onRegenerate={() => console.log("Regenerate clicked")}
        onDownload={() => console.log("Download clicked")}
      />
    </div>
  );
}
