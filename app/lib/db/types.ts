export type GoalType = "one-time" | "repeated";

export interface Goal {
  id: string;
  title: string;
  type: GoalType;
  createdAt: string;
  isArchived: boolean;
}

export interface GoalCompletion {
  id: string;
  goalId: string;
  date: string;
  completedAt: string;
}

export interface GoalWithStatus extends Goal {
  isCompletedToday: boolean;
}
