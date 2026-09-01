const PLACEHOLDER_EMAIL = "cliente@ecurriculodigital.com.br";

export function isValidPayerEmail(email?: string | null): boolean {
  const value = email?.trim() ?? "";
  if (!value) return false;
  if (value.toLowerCase() === PLACEHOLDER_EMAIL) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function splitPersonName(fullName?: string | null): {
  first_name?: string;
  last_name?: string;
} {
  const parts = (fullName ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return {};
  if (parts.length === 1) return { first_name: parts[0], last_name: parts[0] };
  return { first_name: parts[0], last_name: parts.slice(1).join(" ") };
}

export function cleanIdentification(id?: { type?: string; number?: string } | null) {
  if (!id?.type && !id?.number) return undefined;
  const number = (id.number ?? "").replace(/\D/g, "");
  if (!id.type && !number) return undefined;
  return { type: id.type, number };
}
