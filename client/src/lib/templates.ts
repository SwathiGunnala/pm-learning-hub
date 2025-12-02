export const frameworkTemplates: Record<string, string> = {
  "rice": `# RICE Scoring Template

## Feature/Initiative: [Name]

### Reach
How many users will this affect in a given time period?
- Time period: __________ (e.g., per quarter)
- Estimated users affected: __________
- Data source: __________

### Impact
How much will this move your key metric? (Score: 0.25=minimal, 0.5=low, 1=medium, 2=high, 3=massive)
- Key metric being impacted: __________
- Expected change: __________
- Impact score: __________

### Confidence
How sure are you about your estimates? (100%=high, 80%=medium, 50%=low)
- Reach confidence: __%
- Impact confidence: __%
- Overall confidence: __%

### Effort
How many person-months will this take?
- Engineering: __________ person-months
- Design: __________ person-months
- Other: __________ person-months
- Total effort: __________ person-months

---

## RICE Score Calculation

RICE = (Reach × Impact × Confidence) / Effort

Your score: ( _____ × _____ × _____ ) / _____ = _____

---

## Comparison Table

| Feature | Reach | Impact | Confidence | Effort | RICE Score |
|---------|-------|--------|------------|--------|------------|
|         |       |        |            |        |            |
|         |       |        |            |        |            |
|         |       |        |            |        |            |

---

## Notes & Assumptions
[Document any key assumptions that affect your estimates]
`,

  "jtbd": `# Jobs-to-be-Done Interview Template

## Interview Details
- Interviewee: __________
- Date: __________
- Product/Service discussed: __________

---

## Part 1: The Timeline

### First Thought
When did you first realize you needed a solution like this?
- What was happening in your life/work?
- What triggered the thought?

### Passive Looking
How long did you passively think about it before actively searching?
- What kept you from acting sooner?

### Active Looking
What made you start actively searching for a solution?
- What options did you consider?
- How did you evaluate them?

### Decision
What made you choose [this solution]?
- What was the final trigger?
- Who else was involved in the decision?

---

## Part 2: The Forces

### Push (Away from current situation)
What problems or frustrations pushed you to look for something new?
1. 
2. 
3. 

### Pull (Toward new solution)
What attracted you to the new solution?
1. 
2. 
3. 

### Anxiety (Concerns about the new)
What worries or concerns did you have about switching?
1. 
2. 
3. 

### Habit (Attachment to current)
What made you hesitant to leave your current solution?
1. 
2. 
3. 

---

## Part 3: The Job Story

Complete this statement based on your interview:

"When I _________________________ [situation],
I want to _________________________ [motivation],
so I can _________________________ [expected outcome]."

---

## Key Insights
1. 
2. 
3. 

## Product Implications
What should we build, change, or improve based on this?
`,

  "north-star": `# North Star Metric Worksheet

## Company/Product: __________
## Date: __________

---

## Step 1: Define Your Core Value

What is the single moment when customers get value from your product?
__________________________________________________________

What action or outcome represents that value delivery?
__________________________________________________________

---

## Step 2: Candidate Metrics

List 3-5 potential North Star Metrics:

| Metric | Captures Value? | Measurable? | Actionable? | Leading? |
|--------|----------------|-------------|-------------|----------|
|        | Yes/No         | Yes/No      | Yes/No      | Yes/No   |
|        | Yes/No         | Yes/No      | Yes/No      | Yes/No   |
|        | Yes/No         | Yes/No      | Yes/No      | Yes/No   |
|        | Yes/No         | Yes/No      | Yes/No      | Yes/No   |

---

## Step 3: Choose Your North Star

Selected North Star Metric: __________

Why this metric?
__________________________________________________________

---

## Step 4: Input Metrics

What metrics lead to your North Star? (These are what teams will focus on)

| Input Metric | Team Owner | How it drives North Star |
|--------------|------------|-------------------------|
|              |            |                         |
|              |            |                         |
|              |            |                         |
|              |            |                         |

---

## Step 5: Baseline & Targets

Current North Star value: __________
Target (3 months): __________
Target (12 months): __________

---

## Validation Checklist

[ ] Does improving this metric clearly benefit customers?
[ ] Does it connect to revenue/retention in the long term?
[ ] Can all teams trace their work back to it?
[ ] Is it hard to game without actually creating value?
[ ] Will it remain relevant as we grow?

---

## Communication Plan

How will you share this with the company?
__________________________________________________________
`,

  "kano": `# Kano Model Analysis Template

## Product/Feature Set: __________
## Date: __________

---

## Survey Questions Format

For each feature, ask two questions:

**Functional:** "If [feature] existed, how would you feel?"
**Dysfunctional:** "If [feature] did NOT exist, how would you feel?"

Response options:
1. I like it
2. I expect it
3. I am neutral
4. I can tolerate it
5. I dislike it

---

## Feature Categorization Table

| Feature | Functional Response | Dysfunctional Response | Category |
|---------|--------------------|-----------------------|----------|
|         |                    |                       |          |
|         |                    |                       |          |
|         |                    |                       |          |
|         |                    |                       |          |
|         |                    |                       |          |

---

## Kano Evaluation Matrix

Use responses to categorize features:

|                    | Dysfunctional (Without Feature)                    |
|                    | Like | Expect | Neutral | Tolerate | Dislike |
|--------------------|------|--------|---------|----------|---------|
| **Functional**     |      |        |         |          |         |
| Like               | Q    | A      | A       | A        | O       |
| Expect             | R    | I      | I       | I        | M       |
| Neutral            | R    | I      | I       | I        | M       |
| Tolerate           | R    | I      | I       | I        | M       |
| Dislike            | R    | R      | R       | R        | Q       |

**Categories:**
- M = Must-be (expected, causes dissatisfaction if missing)
- O = One-dimensional (more is better)
- A = Attractive (delighters)
- I = Indifferent (doesn't matter)
- R = Reverse (actively disliked)
- Q = Questionable (contradictory response)

---

## Prioritization Summary

### Must-Have Features (Build first)
1. 
2. 
3. 

### Performance Features (Invest for differentiation)
1. 
2. 
3. 

### Attractive Features (Sprinkle in for delight)
1. 
2. 
3. 

### Skip/Deprioritize
1. 
2. 
3. 

---

## Notes
[Any observations about patterns or surprising results]
`,

  "opportunity-tree": `# Opportunity Solution Tree Template

## Outcome: __________
(The measurable business goal you're trying to achieve)

---

## Level 1: Opportunities
What user needs, pain points, or desires could drive this outcome?

### Opportunity A: __________
Evidence: __________

### Opportunity B: __________
Evidence: __________

### Opportunity C: __________
Evidence: __________

---

## Level 2: Solutions
For each promising opportunity, brainstorm at least 3 solutions:

### Opportunity A Solutions:
1. __________
2. __________
3. __________

### Opportunity B Solutions:
1. __________
2. __________
3. __________

### Opportunity C Solutions:
1. __________
2. __________
3. __________

---

## Level 3: Experiments
For your top solution ideas, define small experiments:

### Experiment 1
- Solution being tested: __________
- Hypothesis: If we __________, then __________ because __________
- Experiment type: [ ] Prototype [ ] Fake door [ ] Wizard of Oz [ ] A/B test [ ] Other
- Success metric: __________
- Time to run: __________

### Experiment 2
- Solution being tested: __________
- Hypothesis: If we __________, then __________ because __________
- Experiment type: [ ] Prototype [ ] Fake door [ ] Wizard of Oz [ ] A/B test [ ] Other
- Success metric: __________
- Time to run: __________

### Experiment 3
- Solution being tested: __________
- Hypothesis: If we __________, then __________ because __________
- Experiment type: [ ] Prototype [ ] Fake door [ ] Wizard of Oz [ ] A/B test [ ] Other
- Success metric: __________
- Time to run: __________

---

## Results Tracker

| Experiment | Result | Learn | Next Step |
|------------|--------|-------|-----------|
|            |        |       |           |
|            |        |       |           |
|            |        |       |           |

---

## Decision Log
Track which branches you pursued and why:

| Date | Decision | Rationale |
|------|----------|-----------|
|      |          |           |
|      |          |           |
`,

  "user-story-mapping": `# User Story Mapping Template

## Product/Feature: __________
## User Persona: __________
## Date: __________

---

## The Backbone (User Activities)
What are the main activities in the user journey? (Left to right = sequence)

| Activity 1 | Activity 2 | Activity 3 | Activity 4 | Activity 5 |
|------------|------------|------------|------------|------------|
|            |            |            |            |            |

---

## The Ribs (User Tasks)
Under each activity, list the tasks users perform (top = essential, bottom = nice-to-have)

### Activity 1: __________
| Priority | Task |
|----------|------|
| Must-have | |
| Must-have | |
| Should-have | |
| Could-have | |
| Won't-have (this release) | |

### Activity 2: __________
| Priority | Task |
|----------|------|
| Must-have | |
| Must-have | |
| Should-have | |
| Could-have | |
| Won't-have (this release) | |

### Activity 3: __________
| Priority | Task |
|----------|------|
| Must-have | |
| Must-have | |
| Should-have | |
| Could-have | |
| Won't-have (this release) | |

### Activity 4: __________
| Priority | Task |
|----------|------|
| Must-have | |
| Must-have | |
| Should-have | |
| Could-have | |
| Won't-have (this release) | |

---

## Release Slices

### MVP (Release 1)
Goal: __________
Includes:
- [ ] 
- [ ] 
- [ ] 
- [ ] 

### Release 2
Goal: __________
Includes:
- [ ] 
- [ ] 
- [ ] 

### Release 3
Goal: __________
Includes:
- [ ] 
- [ ] 
- [ ] 

---

## Validation Checklist

[ ] Can a user complete their core goal with just MVP features?
[ ] Does each release tell a complete (if minimal) user story?
[ ] Have we identified all edge cases and error states?
[ ] Has the team reviewed and agreed on priorities?

---

## Notes & Dependencies
[Document technical dependencies, risks, or open questions]
`
};

export function downloadTemplate(frameworkId: string, frameworkTitle: string) {
  const content = frameworkTemplates[frameworkId];
  if (!content) return;
  
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${frameworkTitle.toLowerCase().replace(/\s+/g, '-')}-template.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
