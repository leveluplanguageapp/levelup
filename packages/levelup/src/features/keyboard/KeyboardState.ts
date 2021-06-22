import {useRef, useState} from 'react';
import {Key, Modifiers} from './Keyboard';

export const useKeyboardState = (
  onKeyPress: (key: Key, modifiers: Modifiers) => void,
) => {
  const [modifiers, setModifiers] = useState<Modifiers>({shift: false});
  const shiftOnNextKey = useRef(false);

  const handleKeyPress = (key: Key) => {
    const {modifier} = key;

    if (shiftOnNextKey.current) {
      shiftOnNextKey.current = false;
      modifiers.shift = !modifiers.shift;
    } else if (modifier) {
      modifiers[modifier] = !modifiers[modifier];
    }
    if (modifiers.shift) {
      shiftOnNextKey.current = true;
    }

    setModifiers({...modifiers});
    onKeyPress(key, modifiers);
  };

  return {modifiers, handleKeyPress};
};
