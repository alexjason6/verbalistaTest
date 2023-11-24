import React, {useState, useCallback} from 'react';

import {PropsItems} from '../../types/PropsItems';
import {type PropsDropZones} from '../../types/DropZones';
import {items} from '../../data/items';
import {suggestions} from '../../data/suggestions';

import Draggable from './components/Dragrable';
import {checkDropZone} from '../../utils/checkDropZone';

import {DropZone, Clear, Input, SafeArea, Text, View} from './styles';

export const Home: React.FC = () => {
  const [res, setRes] = useState<string>('');
  const [handleEvent, setHandleEvent] = useState('');
  const [dropZones, setDropZones] = useState<PropsDropZones[]>([]);
  const [userItems, setUserItems] = useState<PropsItems[]>([]);

  //console.log({userItems});

  // Collect dropZones on screen
  const dropZonesLayout = (event: any, itemName: string) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setDropZones(prevDropZones => [
      ...prevDropZones,
      {x, y, width, height, value: itemName},
    ]);
  };

  const handleSetInput = useCallback(
    (value: any, event: string, position: {x: number; y: number}) => {
      const dropZone = checkDropZone(position, value.props.value, dropZones);

      if (event === 'click') {
        console.log(event, value.props.value, position);
      }

      if (event === 'move') {
        // aqui vai entrar algo para ser feito enquanto <Draggable> é arrastado.
      }

      if (event === 'stoped') {
        if (dropZone) {
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
          //console.log('DropZone encontrada:', dropZone);
          // Faça o que for necessário com a DropZone encontrada
        }

        //console.log(itemFiltered);
      }
      setHandleEvent(event);
    },
    [dropZones],
  );

  return (
    <SafeArea>
      {items.map((item: {name: string; value: number}, index: number) => {
        const [userItemExists] = userItems?.filter(
          userItem => userItem.name === item.name,
        );

        console.log(userItemExists);
        return (
          <View
            dropZone
            key={item.value}
            onLayout={(event: any) => dropZonesLayout(event, item.name)}>
            <Text allowFontScaling={true} maxFontSizeMultiplier={2}>
              {item.name}
            </Text>
            {handleEvent === 'move' ? (
              <DropZone>
                <Text dropZone>Drop a word here!</Text>
              </DropZone>
            ) : (
              <View input>
                <Input
                  placeholder={'Type or drop a word here!'}
                  placeholderTextColor="#444444"
                  returnKeyType={
                    index !== items.length - 1 ? 'next' : 'default'
                  }
                  value={userItemExists?.translate}
                  onChangeText={(value: string) => setRes(value)}
                  correct={!!userItemExists}
                />
                <Clear name="x" color="#444444" />
              </View>
            )}
          </View>
        );
      })}
      <View>
        {suggestions.map(item => {
          //console.log('Olá', item, userItems);
          /* console.log(
            userItems.filter(userItem => userItem.translate === item.translate),
          ); */
          return (
            <Draggable
              key={item.name}
              item={item}
              correct={false}
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
