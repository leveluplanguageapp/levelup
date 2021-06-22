export type Keyboard = {
  rows: Key[][];
  shiftedRow: Key[][];
};

export type Key = {
  main: string;
  sub?: string;
  output?: string;
  size?: number;
  modifier?: keyof Modifiers;
  backspace?: boolean;
  space?: boolean;
  type?: KeyType;
};

export type Modifiers = {
  shift?: boolean;
};

export enum KeyType {
  Primary,
  Secondary,
}
