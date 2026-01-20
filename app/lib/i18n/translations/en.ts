import type { Translations } from "../types";

export const en: Translations = {
  common: {
    cancel: "Cancel",
    save: "Save",
    back: "Back",
  },

  nav: {
    goals: "Goals",
    stats: "Stats",
    about: "About",
  },

  goals: {
    viewingHistory: "Viewing history - goals are read-only",
    completed: "Completed",
    daily: "Daily",
    addGoal: "Add goal",
    addNewGoal: "Add new goal",
    addFirstGoal: "Add your first goal",
    whatToAccomplish: "What do you want to accomplish?",
    repeat: "Repeat",
    everyDay: "Every day",
    onlyToday: "Only today",
    noGoalsToday: "No goals for today",
    noGoalsRecorded: "No goals recorded",
    startAddingGoal: "Start by adding your first goal for today",
    noGoalsOnThisDay: "There were no goals on this day",
    deleteGoal: "Delete goal",
    deleteGoalConfirm: "Are you sure you want to delete this goal?",
    deleteGoalWarningRepeated:
      "This is a recurring goal. Deleting it will permanently remove it and it will not appear on future days.",
    deleteGoalWarningOneTime:
      "This goal and its completion history will be permanently deleted.",
    delete: "Delete",
  },

  dates: {
    today: "Today",
    yesterday: "Yesterday",
    goToToday: "Go to today",
    previousDay: "Previous day",
    nextDay: "Next day",
  },

  stats: {
    title: "Statistics",
    goalsCompleted: "Goals Completed",
    completionRate: "Completion Rate",
    ofPossible: "of {total} possible",
    overallAverage: "overall average",
    breakdown: "Breakdown",
    completed: "completed",
    noDataAvailable: "No data available",
    monthly: "Monthly",
    quarterly: "Quarterly",
    semiannual: "Semi-annual",
    annual: "Annual",
    goalsPerMonth: "Goals completed per month",
    goalsPerQuarter: "Goals completed per quarter",
    goalsPerSemester: "Goals completed per semester",
    goalsPerYear: "Goals completed per year",
  },

  about: {
    title: "About",
    appName: "My Daily Goals",
    description:
      "A minimalist app for tracking daily goals. Add one-time or repeated goals, track your progress, and view statistics over time.",
    links: "Links",
    sourceCode: "Source Code & Documentation",
    reportIssue: "Report Issue / Request Feature",
    creator: "Creator",
    backToGoals: "Back to Goals",
  },
};
