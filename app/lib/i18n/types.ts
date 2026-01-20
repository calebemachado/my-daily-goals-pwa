export type Locale = "en" | "pt-BR";

export interface Translations {
  common: {
    cancel: string;
    save: string;
    back: string;
  };

  nav: {
    goals: string;
    stats: string;
    about: string;
  };

  goals: {
    viewingHistory: string;
    completed: string;
    daily: string;
    addGoal: string;
    addNewGoal: string;
    addFirstGoal: string;
    whatToAccomplish: string;
    repeat: string;
    everyDay: string;
    onlyToday: string;
    noGoalsToday: string;
    noGoalsRecorded: string;
    startAddingGoal: string;
    noGoalsOnThisDay: string;
    deleteGoal: string;
    deleteGoalConfirm: string;
    deleteGoalWarningRepeated: string;
    deleteGoalWarningOneTime: string;
    delete: string;
  };

  dates: {
    today: string;
    yesterday: string;
    goToToday: string;
    previousDay: string;
    nextDay: string;
  };

  stats: {
    title: string;
    goalsCompleted: string;
    completionRate: string;
    ofPossible: string;
    overallAverage: string;
    breakdown: string;
    completed: string;
    noDataAvailable: string;
    monthly: string;
    quarterly: string;
    semiannual: string;
    annual: string;
    goalsPerMonth: string;
    goalsPerQuarter: string;
    goalsPerSemester: string;
    goalsPerYear: string;
  };

  about: {
    title: string;
    appName: string;
    description: string;
    links: string;
    sourceCode: string;
    reportIssue: string;
    creator: string;
    backToGoals: string;
  };
}
