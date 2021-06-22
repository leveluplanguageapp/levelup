import { useLessonState } from '../src/features/lesson/LessonState';
import { Lesson } from '../src/features/lesson/Lesson';
import { renderHook, RenderResult } from '@testing-library/react-hooks';
import { act } from 'react-test-renderer';

const lesson: Lesson = {
  parts: [
    {
      words: [
        {
          source: 'a',
          output: '',
        },
        {
          source: 'bc',
          output: '',
        },
      ],
    },
    {
      words: [
        {
          source: 'a',
          output: '',
        },
        {
          source: 'b',
          output: '',
        },
      ],
    },
  ],
};

const render = (
  initialState = { index: 0, partIndex: 0, hint: false, seen: [] }
) => {
  const { result, waitForNextUpdate } = renderHook(() =>
    useLessonState(lesson, initialState)
  );
  return { result, waitForNextUpdate };
};

const sendKey = async (
  key: string,
  result: RenderResult<ReturnType<typeof useLessonState>>,
  wait: () => Promise<any>
) => {
  act(() => {
    result.current.handleInput({ output: key } as any);
  });
  await wait();
};

describe('LessonState', () => {
  it('has correct initial state', () => {
    const { result } = render();

    expect(result.current.done).toBe('');
    expect(result.current.remaining).toBe('a bc');
    expect(result.current.canHint).toBe(false);
    expect(result.current.isComplete).toBe(false);
    expect(result.current.isPartComplete).toBe(false);
  });

  it('Updates to correct state after valid input', async () => {
    const { result, waitForNextUpdate } = render();

    act(() => {
      result.current.handleInput({ output: 'a' } as any);
    });
    await waitForNextUpdate();
    expect(result.current.done).toBe('a');
    expect(result.current.remaining).toBe(' bc');
    expect(result.current.isComplete).toBe(false);
    expect(result.current.isPartComplete).toBe(false);
  });

  it('Updates to correct state after invalid input', () => {
    const { result } = render();

    act(() => {
      result.current.handleInput({ output: 'x' } as any);
    });

    expect(result.current.done).toBe('');
    expect(result.current.remaining).toBe('a bc');
  });

  it('Moves to next part when previous part completes', async () => {
    const { result, waitForNextUpdate } = render();

    await sendKey('a', result, waitForNextUpdate);
    await sendKey('b', result, waitForNextUpdate);
    await sendKey('c', result, waitForNextUpdate);

    expect(result.current.done).toBe('');
    expect(result.current.remaining).toBe('? b');
  });

  it('Applies mask and hint', async () => {
    const { result, waitForNextUpdate } = render();

    await sendKey('a', result, waitForNextUpdate);
    await sendKey('b', result, waitForNextUpdate);
    await sendKey('c', result, waitForNextUpdate);

    expect(result.current.remaining).toBe('? b');

    act(() => {
      result.current.handleHint();
    });
    await waitForNextUpdate();

    expect(result.current.remaining).toBe('a b');
  });
});
