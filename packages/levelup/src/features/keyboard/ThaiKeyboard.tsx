import * as React from 'react';
import {Key, Keyboard, KeyType, Modifiers} from 'features/keyboard/Keyboard';
import {useKeyboardState} from 'features/keyboard/KeyboardState';
import {Centered, Column, Row, TouchableOpacity} from 'system/components/Flex';
import {Text} from 'system/components/Text';

type Props = {
  onKeyPress(key: Key, modifiers: Modifiers): void;
};

export const ThaiKeyboard = (props: Props) => {
  const {onKeyPress} = props;
  const {modifiers, handleKeyPress} = useKeyboardState(onKeyPress);
  const keys = modifiers.shift ? Keys.shiftedRow : Keys.rows;

  return (
    <Column
      backgroundColor={'background.3'}
      borderBottomColor={'dividers.1'}
      borderBottomWidth={1}>
      {keys.map((row, rowIndex) => {
        return (
          <Row padding={'sm'} key={rowIndex}>
            {row.map((key, keyIndex) => {
              return (
                <TouchableOpacity
                  key={keyIndex}
                  onPress={() => handleKeyPress(key)}
                  height={50}
                  flex={key.size || 1}>
                  <Centered
                    flex={key.size || 1}
                    borderRadius={5}
                    margin={'xs'}
                    elevation={3}
                    backgroundColor={getColor(key)}>
                    <Column
                      alignItems={'center'}
                      alignSelf={'center'}
                      marginTop={'auto'}
                      marginBottom={key.sub ? 'auto' : 0}>
                      {getKeys(key)}
                      <Text fontSize={8} color={'accent.1'}>
                        {key.sub}
                      </Text>
                    </Column>
                  </Centered>
                </TouchableOpacity>
              );
            })}
          </Row>
        );
      })}
    </Column>
  );
};

const getKeys = (key: Key) => {
  let output = key.output || key.main;
  const chars = key.main.split('').map(char => {
    if (output.includes(char)) {
      return (
        <Text key={char} fontFamily={'thai'}>
          {char}
        </Text>
      );
    } else {
      return (
        <Text key={char} fontFamily={'thai'} color={'text.3'}>
          {char}
        </Text>
      );
    }
  });
  return <Text>{chars}</Text>;
};

const getColor = (key: Key) => {
  switch (key.type) {
    case KeyType.Secondary:
      return 'background.4';
    default:
      return 'background.1';
  }
};

const Keys: Keyboard = {
  rows: [
    [
      {main: '???'},
      {main: '/'},
      {main: '_'},
      {main: '???'},
      {main: '???', sub: 't'},
      {main: '??????', output: '???', sub: 'u', type: KeyType.Secondary},
      {main: '??????', output: '???', sub: 'eu', type: KeyType.Secondary},
      {main: '???', sub: 'k'},
      {main: '???', sub: 'dt'},
      {main: '???', sub: 'j'},
      {main: '???', sub: 'k'},
      {main: '???', sub: 'ch'},
    ],
    [
      {main: '???'},
      {main: '???', sub: 'ai'},
      {main: '???', sub: 'am'},
      {main: '???', sub: 'p'},
      {main: '???', sub: 'a'},
      {main: '??????', output: '???', sub: '', type: KeyType.Secondary},
      {main: '??????', output: '???', sub: 'ee', type: KeyType.Secondary},
      {main: '???', sub: 'r'},
      {main: '???', sub: 'n'},
      {main: '???', sub: 'y'},
      {main: '???', sub: 'b'},
      {main: '???', sub: 'l'},
    ],
    [
      {main: '???', sub: 'f'},
      {main: '???', sub: 'h'},
      {main: '???', sub: 'g'},
      {main: '???', sub: 'd'},
      {main: '???', sub: 'ay'},
      {main: '??????', output: '???', type: KeyType.Secondary},
      {main: '??????', output: '???', type: KeyType.Secondary},
      {main: '???', sub: 'aa'},
      {main: '???', sub: 's'},
      {main: '???', sub: 'w'},
      {main: '???', sub: 'ng'},
      {main: '???', sub: 'k'},
    ],
    [
      {main: '???', modifier: 'shift'},
      {main: '???', sub: 'p'},
      {main: '???', sub: 'bp'},
      {main: '???', sub: 'ae'},
      {main: '???', sub: 'or'},
      {main: '??????', output: '???', sub: 'eu', type: KeyType.Secondary},
      {main: '??????', output: '???', sub: 'i', type: KeyType.Secondary},
      {main: '???', sub: 't'},
      {main: '???', sub: 'm'},
      {main: '???', sub: 'ai'},
      {main: '???', sub: 'f'},
      {main: '???', backspace: true},
    ],
    [{main: '???'}, {main: 'space', sub: '', size: 10}],
  ],
  shiftedRow: [
    [
      {main: '+'},
      {main: '???', sub: '1'},
      {main: '???', sub: '2'},
      {main: '???', sub: '3'},
      {main: '???', sub: '4'},
      {main: '??????', output: '???', sub: 'oo', type: KeyType.Secondary},
      {main: '???', type: KeyType.Secondary},
      {main: '???', sub: '5'},
      {main: '???', sub: '6'},
      {main: '???', sub: '7'},
      {main: '???', sub: '8'},
      {main: '???', sub: '9'},
    ],
    [
      {main: '???', sub: '0'},
      {main: '"'},
      {main: '???', sub: 'd'},
      {main: '???', sub: 't'},
      {main: '???', sub: 't'},
      {main: '??????', output: '???', type: KeyType.Secondary},
      {main: '??????', output: '???', type: KeyType.Secondary},
      {main: '???', sub: 'n'},
      {main: '???'},
      {main: '???', sub: 'y'},
      {main: '???', sub: 't'},
      {main: ','},
    ],
    [
      {main: '???', sub: 'r'},
      {main: '???', sub: 'kh'},
      {main: '???', sub: 't'},
      {main: '???', sub: 'oh'},
      {main: '???', sub: 'ch'},
      {main: '??????', output: '???', sub: '', type: KeyType.Secondary},
      {main: '??????', output: '???', sub: '', type: KeyType.Secondary},
      {main: '???', sub: 's'},
      {main: '???', sub: 's'},
      {main: '???', sub: 's'},
      {main: '.', sub: ''},
      {main: '???', sub: 'kh'},
    ],
    [
      {main: '???', modifier: 'shift'},
      {main: '('},
      {main: ')'},
      {main: '???', sub: 'ch'},
      {main: '???', sub: 'h'},
      {main: '??????', output: '???', sub: '', type: KeyType.Secondary},
      {main: '??????', output: '???', sub: '', type: KeyType.Secondary},
      {main: '?'},
      {main: '???', sub: 'th'},
      {main: '???', sub: 'l'},
      {main: '???', sub: ''},
      {main: '???', backspace: true},
    ],
    [{main: '???'}, {main: 'space', sub: '', size: 10}],
  ],
};
