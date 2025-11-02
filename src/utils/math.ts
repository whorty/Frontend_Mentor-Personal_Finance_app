export const calcPercentage = (a: number, b: number): string => {
  return Math.min(Math.round((a / b) * 100), 100).toFixed(1);
};
