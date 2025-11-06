export default function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// Example:
// console.log(formatDate("2024-08-19T14:23:11+00:00")); // "19 Aug 2024"
