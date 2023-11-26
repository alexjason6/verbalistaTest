import React, {useState, useCallback} from 'react';

import {PropsItems} from '../../types/PropsItems';
import {type PropsDropZones} from '../../types/DropZones';
import {items} from '../../data/items';
import {suggestions} from '../../data/suggestions';

import Draggable from './components/Dragrable';
import {checkDropZone} from '../../utils/checkDropZone';

import {
  DropZone,
  Clear,
  IconClear,
  Input,
  SafeArea,
  Text,
  View,
} from './styles';

export const Home: React.FC = () => {
  const [handleEvent, setHandleEvent] = useState('');
  const [dropZones, setDropZones] = useState<PropsDropZones[]>([]);
  const [userItems, setUserItems] = useState<PropsItems[]>([]);
  const [suggestionsFiltered, setSuggestionsFilterd] = useState(suggestions);

  const dropZonesLayout = (event: any, itemName: string) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setDropZones(prevDropZones => [
      ...prevDropZones,
      {x, y, width, height, value: itemName},
    ]);
  };

  const handleSetInput = useCallback(
    (value: string, event: string, position: {x: number; y: number}) => {
      const dropZone = checkDropZone(position, value, event, dropZones);

      //console.log(dropZone);

      if (event === 'stoped' && dropZone) {
        setUserItems(prevState => {
          const prevExists = prevState?.filter(
            prevItem => prevItem.name === dropZone[1].name,
          );

          if (prevExists) {
            const removeRepeted = prevState.filter(
              prevItem => prevItem.name !== dropZone[1].name,
            );
            return [...removeRepeted, dropZone[1]];
          } else {
            return [dropZone[1]];
          }
        });
      }
      setHandleEvent(event);
    },
    [dropZones],
  );

  const handleFilterSuggestions = (value: string) => {
    const filter = suggestions.filter(suggestion =>
      suggestion.name.toLowerCase().includes(value.toLowerCase()),
    );

    setSuggestionsFilterd(filter);
  };

  const handleClearInput = (input: string) => {
    const userItemRemove = userItems.filter(
      userItem => userItem.name !== input,
    );

    setUserItems(userItemRemove);
  };

  return (
    <SafeArea>
      {items.map((item: {name: string; value: number}, index: number) => {
        const [userItemExists]: any = userItems?.filter(
          userItem => userItem.name === item.name,
        );
        return (
          <View
            dropZone
            key={item.value}
            onLayout={(event: any) => dropZonesLayout(event, item.name)}>
            <Text allowFontScaling={true} maxFontSizeMultiplier={2}>
              {item.name}
            </Text>
            <View input>
              {handleEvent === 'move' && !userItemExists ? (
                <DropZone>
                  <Text dropZone>Drop a word here!</Text>
                </DropZone>
              ) : (
                <>
                  <Input
                    returnKeyType={
                      index !== items.length - 1 ? 'next' : 'default'
                    }
                    value={userItemExists?.translate}
                    autoCorrect={false}
                    spellCheck={false}
                    keyboardType="visible-password"
                    onChangeText={(value: string) =>
                      handleFilterSuggestions(value)
                    }
                    correct={!!userItemExists}
                  />
                  {userItemExists && (
                    <Clear onPress={() => handleClearInput(item.name)}>
                      <IconClear name="x" />
                    </Clear>
                  )}
                </>
              )}
            </View>
          </View>
        );
      })}
      <View draggable>
        {suggestionsFiltered.map(item => {
          const [userItemExists] = userItems?.filter(
            userItem => userItem.name === item.translate,
          );
          return (
            <Draggable
              key={item.name}
              item={item}
              correct={!!userItemExists}
              func={(
                value: any,
                event: any,
                position: {x: number; y: number},
              ) => handleSetInput(value, event, position)}
            />
          );
        })}
      </View>
    </SafeArea>
  );
};

export default Home;
