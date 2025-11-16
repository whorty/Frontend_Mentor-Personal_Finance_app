export default function getLastest<
  T extends { category: string; date: string }
>(data: T[] | undefined) {
  if (data === undefined) {
    return [];
  }
  const groups: Record<string, T[]> = data.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, T[]>);

  for (const category in groups) {
    groups[category] = groups[category]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3);
  }

  return groups;
}
