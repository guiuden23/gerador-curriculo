"use client";

const PAYMENT_KEY = "curriculoia-payment-verified";

interface VerifiedPayment {
  planId: string;
  paymentId: number | string;
  verifiedAt: number;
}

export function saveVerifiedPayment(planId: string, paymentId: number | string) {
  try {
    const payload: VerifiedPayment = {
      planId,
      paymentId,
      verifiedAt: Date.now(),
    };
    sessionStorage.setItem(PAYMENT_KEY, JSON.stringify(payload));
  } catch {
    // sessionStorage indisponível
  }
}

export function loadVerifiedPayment(): VerifiedPayment | null {
  try {
    const raw = sessionStorage.getItem(PAYMENT_KEY);
    return raw ? (JSON.parse(raw) as VerifiedPayment) : null;
  } catch {
    return null;
  }
}

export function isPaymentVerified(planId: string): boolean {
  const stored = loadVerifiedPayment();
  return stored?.planId === planId;
}

export function clearVerifiedPayment() {
  try {
    sessionStorage.removeItem(PAYMENT_KEY);
  } catch {
    // ignora
  }
}
