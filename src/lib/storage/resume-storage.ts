"use client";

import type { ResumeData } from "@/lib/types";

const STORAGE_KEY = "curriculoia-resume-data";

export function saveResumeData(data: ResumeData) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // sessionStorage indisponível (privacidade/SSR) — ignora
  }
}

export function loadResumeData(): ResumeData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ResumeData) : null;
  } catch {
    return null;
  }
}

export function clearResumeData() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignora
  }
}
