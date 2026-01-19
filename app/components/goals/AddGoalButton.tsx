"use client";

interface AddGoalButtonProps {
  onClick: () => void;
}

export function AddGoalButton({ onClick }: AddGoalButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-900 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 dark:bg-zinc-100 dark:text-zinc-900"
      aria-label="Add new goal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </button>
  );
}
