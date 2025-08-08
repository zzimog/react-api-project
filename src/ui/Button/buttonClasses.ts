import { type Classes, classBuilder } from '@/utils';

const buttonSlots = [
  'root',
  'label',
  'icon',
  'focus',
  'active',
  'disabled',
  'loading',
] as const;

export type ButtonClasses = Classes<typeof buttonSlots>;

export const buttonClasses: ButtonClasses = classBuilder('Button', buttonSlots);
