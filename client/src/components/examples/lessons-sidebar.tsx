import { LessonsSidebar } from "../lessons-sidebar";

export default function LessonsSidebarExample() {
  const mockLessons = [
    "An overstuffed backlog obscures what truly matters, just like a cluttered closet hides your favorite items",
    "Prioritization means saying 'not right now' to create focus, not rejecting ideas forever",
    "Fewer items in your backlog means more mental energy per item to solve real user problems"
  ];

  return (
    <div className="p-6 max-w-md">
      <LessonsSidebar lessons={mockLessons} />
    </div>
  );
}
