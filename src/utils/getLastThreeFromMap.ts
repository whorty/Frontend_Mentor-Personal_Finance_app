import type { Transaction } from "./DataContext";

// Return the precomputed last-3 transactions map entry for a category.
export default function getLastThreeFromMap<T = Transaction>(
  map: Record<string, T[]> | undefined,
  category: string
): T[] {
  if (!map || typeof map !== "object") return [];
  return map[category] ?? [];
}
