import { proxy, useSnapshot } from 'valtio';
import { Lesson } from './Lesson';
import { Word } from '../lang/Word';
import { Key } from '../keyboard/Keyboard';

type State = {
  index: number;
  partIndex: number;
  hint: boolean;
  seen: string[];
};
const createInitialState = () => ({
  index: 0,
  partIndex: 0,
  hint: false,
  seen: [],
});

export const useLessonState = (
  lesson: Lesson,
  initialState = createInitialState()
) => {
  const state = proxy<State>(initialState);

  const { index, partIndex, hint, seen } = useSnapshot(state, { sync: false });
  const current = lesson.parts[partIndex];
  const all = current.words.map((word) => word.source).join('');
  const words: Word[] = [];
  let isComplete = lesson.parts.length === partIndex + 1;
  let isPartComplete = index === all.length - 1;
  let count = 0;
  let done = '';
  let remaining = '';
  let usedHint = false;

  current.words.forEach((word, wordIndex) => {
    const hasSeen = seen.includes(word.source);
    word.source.split('').forEach((char) => {
      const isDone = count < index;
      if (isDone) {
        done += char;
      } else {
        if (hasSeen) {
          if (!usedHint && hint) {
            usedHint = true;
            remaining += char;
          } else {
            remaining += '?';
          }
        } else {
          remaining += char;
        }
      }
    });
    if (count < index) {
      words.push(word);
      if (!seen.includes(word.source)) {
        state.seen.push(word.source);
      }
    }
    if (wordIndex + 1 < current.words.length) {
      remaining += ' ';
    }
    count++;
  });

  const canHint = remaining.trim().startsWith('?');

  const handleInput = (key: Key) => {
    const output = key.output || key.main;
    if (all.charAt(index) === output) {
      if (remaining.trim().length === 0) {
        state.index = 0;
        if (partIndex + 1 < lesson.parts.length) {
          state.partIndex++;
        }
      } else {
        state.index++;
      }
    }
  };

  const handleHint = () => {
    state.hint = true;
  };

  return {
    canHint,
    words,
    done,
    remaining,
    isComplete,
    isPartComplete,
    handleInput,
    handleHint,
  };
};
