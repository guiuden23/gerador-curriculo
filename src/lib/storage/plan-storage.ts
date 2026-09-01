"use client";

const PLAN_KEY = "curriculoia-selected-plan";

export function saveSelectedPlan(planId: string) {
  try {
    localStorage.setItem(PLAN_KEY, planId);
  } catch {
    // storage indisponível
  }
}

export function loadSelectedPlan(): string | null {
  try {
    return localStorage.getItem(PLAN_KEY);
  } catch {
    return null;
  }
}

export function clearSelectedPlan() {
  try {
    localStorage.removeItem(PLAN_KEY);
  } catch {
    // ignora
  }
}
