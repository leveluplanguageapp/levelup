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
      {main: 'ๅ'},
      {main: '/'},
      {main: '_'},
      {main: 'ภ'},
      {main: 'ถ', sub: 't'},
      {main: 'อุ', output: 'ุ', sub: 'u', type: KeyType.Secondary},
      {main: 'อึ', output: 'ึ', sub: 'eu', type: KeyType.Secondary},
      {main: 'ค', sub: 'k'},
      {main: 'ต', sub: 'dt'},
      {main: 'จ', sub: 'j'},
      {main: 'ข', sub: 'k'},
      {main: 'ช', sub: 'ch'},
    ],
    [
      {main: 'ๆ'},
      {main: 'ไ', sub: 'ai'},
      {main: 'ำ', sub: 'am'},
      {main: 'พ', sub: 'p'},
      {main: 'ะ', sub: 'a'},
      {main: 'อั', output: 'ั', sub: '', type: KeyType.Secondary},
      {main: 'อี', output: 'ี', sub: 'ee', type: KeyType.Secondary},
      {main: 'ร', sub: 'r'},
      {main: 'น', sub: 'n'},
      {main: 'ย', sub: 'y'},
      {main: 'บ', sub: 'b'},
      {main: 'ล', sub: 'l'},
    ],
    [
      {main: 'ฟ', sub: 'f'},
      {main: 'ห', sub: 'h'},
      {main: 'ก', sub: 'g'},
      {main: 'ด', sub: 'd'},
      {main: 'เ', sub: 'ay'},
      {main: 'อ้', output: '้', type: KeyType.Secondary},
      {main: 'อ่', output: '่', type: KeyType.Secondary},
      {main: 'า', sub: 'aa'},
      {main: 'ส', sub: 's'},
      {main: 'ว', sub: 'w'},
      {main: 'ง', sub: 'ng'},
      {main: 'ฃ', sub: 'k'},
    ],
    [
      {main: '⇧', modifier: 'shift'},
      {main: 'ผ', sub: 'p'},
      {main: 'ป', sub: 'bp'},
      {main: 'แ', sub: 'ae'},
      {main: 'อ', sub: 'or'},
      {main: 'อิ', output: 'ิ', sub: 'eu', type: KeyType.Secondary},
      {main: 'อื', output: 'ื', sub: 'i', type: KeyType.Secondary},
      {main: 'ท', sub: 't'},
      {main: 'ม', sub: 'm'},
      {main: 'ใ', sub: 'ai'},
      {main: 'ฝ', sub: 'f'},
      {main: '⌫', backspace: true},
    ],
    [{main: '⚙'}, {main: 'space', sub: '', size: 10}],
  ],
  shiftedRow: [
    [
      {main: '+'},
      {main: '๑', sub: '1'},
      {main: '๒', sub: '2'},
      {main: '๓', sub: '3'},
      {main: '๔', sub: '4'},
      {main: 'อู', output: 'ู', sub: 'oo', type: KeyType.Secondary},
      {main: '฿', type: KeyType.Secondary},
      {main: '๕', sub: '5'},
      {main: '๖', sub: '6'},
      {main: '๗', sub: '7'},
      {main: '๘', sub: '8'},
      {main: '๙', sub: '9'},
    ],
    [
      {main: '๐', sub: '0'},
      {main: '"'},
      {main: 'ฎ', sub: 'd'},
      {main: 'ฑ', sub: 't'},
      {main: 'ธ', sub: 't'},
      {main: 'อํ', output: 'ํ', type: KeyType.Secondary},
      {main: 'อ๊', output: '๊', type: KeyType.Secondary},
      {main: 'ณ', sub: 'n'},
      {main: 'ฯ'},
      {main: 'ญ', sub: 'y'},
      {main: 'ฐ', sub: 't'},
      {main: ','},
    ],
    [
      {main: 'ฤ', sub: 'r'},
      {main: 'ฆ', sub: 'kh'},
      {main: 'ฏ', sub: 't'},
      {main: 'โ', sub: 'oh'},
      {main: 'ฌ', sub: 'ch'},
      {main: 'อ็', output: '็', sub: '', type: KeyType.Secondary},
      {main: 'อ๋', output: '๋', sub: '', type: KeyType.Secondary},
      {main: 'ษ', sub: 's'},
      {main: 'ศ', sub: 's'},
      {main: 'ซ', sub: 's'},
      {main: '.', sub: ''},
      {main: 'ฅ', sub: 'kh'},
    ],
    [
      {main: '⇧', modifier: 'shift'},
      {main: '('},
      {main: ')'},
      {main: 'ฉ', sub: 'ch'},
      {main: 'ฮ', sub: 'h'},
      {main: 'อฺ', output: 'ฺ', sub: '', type: KeyType.Secondary},
      {main: 'อ์', output: '์', sub: '', type: KeyType.Secondary},
      {main: '?'},
      {main: 'ฒ', sub: 'th'},
      {main: 'ฬ', sub: 'l'},
      {main: 'ฦ', sub: ''},
      {main: '⌫', backspace: true},
    ],
    [{main: '⚙'}, {main: 'space', sub: '', size: 10}],
  ],
};
