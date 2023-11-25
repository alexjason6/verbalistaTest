import React, {useRef, useState} from 'react';
import {Animated, PanResponder, StyleSheet, View, Platform} from 'react-native';

import {type PropsComponents} from '../../../../types/PropsComponents';

import {Text} from './styles';

export const Draggable: React.FC<PropsComponents> = ({item, correct, func}) => {
  const [userValue, setUserValue] = useState<string | any>();
  const pan = useRef(new Animated.ValueXY()).current;

  const sendDataToFunc = (value: {props: {value: string}}) => {
    const position = {x: 0, y: 0};
    const action = value.props.value;

    func?.(action, 'click', position);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (e: any) => {
      const eventValue =
        e._dispatchInstances[1].pendingProps.children.props.children;

      setUserValue(eventValue);

      sendDataToFunc(eventValue);

      return true;
    },
    onPanResponderMove: (e, gesture) => {
      const position = {x: gesture.moveX, y: gesture.moveY};

      func?.(userValue, 'move', position);

      return Animated.event(
        [
          null,
          {
            dx: pan.x, // x,y are Animated.Value
            dy: pan.y,
          },
        ],
        {useNativeDriver: false},
      )(e, gesture);
    },
    onPanResponderRelease: (e, gesture) => {
      const position = {x: gesture.moveX, y: gesture.moveY};

      func?.(userValue, 'stoped', position);
      Animated.spring(pan, {
        toValue: {x: 0, y: 0},
        useNativeDriver: true,
        friction: 5,
      }).start();
    },
  });

  const panStyle = {
    transform: pan.getTranslateTransform(),
  };

  return (
    <View {...panResponder.panHandlers}>
      <Animated.View
        key={item?.value}
        style={[panStyle, style.item, style.shadow]}>
        <Text
          style={correct && style.textSelected}
          allowFontScaling={true}
          maxFontSizeMultiplier={2}
          value={item?.translate}>
          {item?.name}
        </Text>
      </Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: Platform.OS === 'android' ? 5 : 0,
  },
  item: {
    paddingVertical: 5,
    paddingHorizontal: 7,
    margin: 5,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#eeeeee',
    borderStyle: 'solid',
  },
  textSelected: {
    color: '#aaaaaa',
  },
});

export default Draggable;
