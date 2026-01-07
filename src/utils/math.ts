export const calcPercentage = (a: number, b: number): string => {
  if (a <= 0) a = 0;
  return Math.min((a / b) * 100, 100).toFixed(1);
};
