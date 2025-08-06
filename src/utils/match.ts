export function match<T>(
  value: unknown,
  cases: { [key: string | number]: T }
): T | undefined {
  const key = Object.keys(cases).find((key) => key === value);
  return key ? cases[key] : cases.default || undefined;
}
