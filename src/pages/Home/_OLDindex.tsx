import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  TextInput,
} from 'react-native';

const DraggableBox = () => {
  const [isDropArea, setIsDropArea] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const isInsideDropArea =
          gesture.moveY < 200 &&
          gesture.moveY > 0 &&
          gesture.moveX > 0 &&
          gesture.moveX < 400;

        console.log({isInsideDropArea});

        if (!isDropArea) {
          Animated.event([null, {dx: pan.x, dy: pan.y}])(event, gesture);
        } else {
          Animated.spring(pan, {
            toValue: {x: gesture.moveX - 50, y: gesture.moveY - 50},
            useNativeDriver: false,
          }).start();
        }

        setIsDropArea(isInsideDropArea);
      },
      onPanResponderRelease: () => {
        if (isDropArea) {
          setInputValue('Alex');
        }
      },
    }),
  ).current;

  console.log('Olá', inputValue);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite algo aqui"
        value={inputValue}
        onChangeText={text => setInputValue(text)}
      />
      <View style={styles.dropArea} {...panResponder.panHandlers}>
        <View
          style={
            isDropArea
              ? [styles.dropAreaContent, styles.dropAreaHover]
              : styles.dropAreaContent
          }
        />
      </View>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{translateX: pan.x}, {translateY: pan.y}],
            backgroundColor: isDropArea ? 'green' : 'skyblue',
          },
        ]}
        {...panResponder.panHandlers}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
    position: 'absolute',
  },
  dropArea: {
    width: '100%',
    height: 200,
    backgroundColor: 'lightgray',
    position: 'absolute',
    top: 0,
  },
  dropAreaContent: {
    flex: 1,
  },
  dropAreaHover: {
    borderColor: 'green',
    borderWidth: 2,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default DraggableBox;
