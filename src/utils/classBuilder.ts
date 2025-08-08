/* eslint-disable @typescript-eslint/no-explicit-any */

export type Classes<T extends readonly string[]> = {
  [K in T[number]]: string;
};

export function classBuilder<T extends readonly string[]>(
  component: string,
  slots: T
): Classes<typeof slots> {
  return slots.reduce((carry, slot) => {
    carry[slot] = `${component}-${slot}`;
    return carry;
  }, {} as any);
}
