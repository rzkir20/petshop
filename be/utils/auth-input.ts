/** Trims ends so accidental spaces from paste/autofill do not break verification. */
export function normalizePasswordInput(value: unknown): string {
  return String(value ?? "").trim();
}
