import type { Goal, GoalCompletion, GoalType } from "./types";
import { generateId, getTodayString } from "./utils";

const DB_NAME = "daily-goals-db";
const DB_VERSION = 1;

let dbInstance: IDBDatabase | null = null;

export function openDB(): Promise<IDBDatabase> {
  if (dbInstance) {
    return Promise.resolve(dbInstance);
  }

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains("goals")) {
        const goalsStore = db.createObjectStore("goals", { keyPath: "id" });
        goalsStore.createIndex("by-archived", "isArchived");
        goalsStore.createIndex("by-type", "type");
      }

      if (!db.objectStoreNames.contains("completions")) {
        const completionsStore = db.createObjectStore("completions", {
          keyPath: "id",
        });
        completionsStore.createIndex("by-date", "date");
        completionsStore.createIndex("by-goal", "goalId");
      }
    };
  });
}

export async function addGoal(
  title: string,
  type: GoalType
): Promise<Goal> {
  const db = await openDB();
  const goal: Goal = {
    id: generateId(),
    title,
    type,
    createdAt: new Date().toISOString(),
    isArchived: false,
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("goals", "readwrite");
    const store = transaction.objectStore("goals");
    const request = store.add(goal);

    request.onsuccess = () => resolve(goal);
    request.onerror = () => reject(request.error);
  });
}

export async function getActiveGoals(): Promise<Goal[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("goals", "readonly");
    const store = transaction.objectStore("goals");
    const request = store.getAll();

    request.onsuccess = () => {
      const goals = request.result as Goal[];
      resolve(goals.filter((g) => !g.isArchived));
    };
    request.onerror = () => reject(request.error);
  });
}

export async function getAllGoals(): Promise<Goal[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("goals", "readonly");
    const store = transaction.objectStore("goals");
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function archiveGoal(goalId: string): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("goals", "readwrite");
    const store = transaction.objectStore("goals");
    const getRequest = store.get(goalId);

    getRequest.onsuccess = () => {
      const goal = getRequest.result as Goal;
      if (goal) {
        goal.isArchived = true;
        const putRequest = store.put(goal);
        putRequest.onsuccess = () => resolve();
        putRequest.onerror = () => reject(putRequest.error);
      } else {
        resolve();
      }
    };
    getRequest.onerror = () => reject(getRequest.error);
  });
}

export async function deleteGoal(goalId: string): Promise<void> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["goals", "completions"], "readwrite");
    const goalsStore = transaction.objectStore("goals");
    const completionsStore = transaction.objectStore("completions");

    goalsStore.delete(goalId);

    const index = completionsStore.index("by-goal");
    const request = index.getAllKeys(IDBKeyRange.only(goalId));

    request.onsuccess = () => {
      for (const key of request.result) {
        completionsStore.delete(key);
      }
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getCompletionsForDate(
  date: string
): Promise<GoalCompletion[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("completions", "readonly");
    const store = transaction.objectStore("completions");
    const index = store.index("by-date");
    const request = index.getAll(IDBKeyRange.only(date));

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function toggleGoalCompletion(
  goalId: string,
  date: string = getTodayString()
): Promise<boolean> {
  const db = await openDB();
  const completionId = `${goalId}_${date}`;

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("completions", "readwrite");
    const store = transaction.objectStore("completions");
    const getRequest = store.get(completionId);

    getRequest.onsuccess = () => {
      if (getRequest.result) {
        const deleteRequest = store.delete(completionId);
        deleteRequest.onsuccess = () => resolve(false);
        deleteRequest.onerror = () => reject(deleteRequest.error);
      } else {
        const completion: GoalCompletion = {
          id: completionId,
          goalId,
          date,
          completedAt: new Date().toISOString(),
        };
        const addRequest = store.add(completion);
        addRequest.onsuccess = () => resolve(true);
        addRequest.onerror = () => reject(addRequest.error);
      }
    };
    getRequest.onerror = () => reject(getRequest.error);
  });
}

export async function getGoalsForDate(date: string): Promise<Goal[]> {
  const db = await openDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["goals", "completions"], "readonly");
    const goalsStore = transaction.objectStore("goals");
    const completionsStore = transaction.objectStore("completions");

    const goalsRequest = goalsStore.getAll();

    goalsRequest.onsuccess = () => {
      const allGoals = goalsRequest.result as Goal[];
      const completionsIndex = completionsStore.index("by-date");
      const completionsRequest = completionsIndex.getAll(
        IDBKeyRange.only(date)
      );

      completionsRequest.onsuccess = () => {
        const completions = completionsRequest.result as GoalCompletion[];
        const completedGoalIds = new Set(completions.map((c) => c.goalId));

        const goalsForDate = allGoals.filter((goal) => {
          // Only show goals that existed on this date
          const goalCreatedDate = goal.createdAt.split("T")[0];
          if (goalCreatedDate > date) {
            return false;
          }

          if (goal.type === "repeated") {
            return !goal.isArchived;
          }
          // One-time goals only show if completed on this date
          return completedGoalIds.has(goal.id);
        });

        resolve(goalsForDate);
      };
      completionsRequest.onerror = () => reject(completionsRequest.error);
    };
    goalsRequest.onerror = () => reject(goalsRequest.error);
  });
}
