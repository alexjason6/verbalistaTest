import React from 'react';

import {PropsComponents} from '../../../../types/PropsComponents';
import {View, Input, DropZone, Text} from './styles';

export const Item: React.FC<PropsComponents> = ({
  nameItem,
  value,
  dropZone,
}) => {
  return (
    <View>
      <Text allowFontScaling={true} maxFontSizeMultiplier={2}>
        {nameItem}
      </Text>
      {dropZone ? (
        <DropZone>
          <Text dropZone>Drop a word here!</Text>
        </DropZone>
      ) : (
        <Input
          placeholder={'Type or drop a word here!'}
          placeholderTextColor="#444444"
          value={value}
        />
      )}
    </View>
  );
};

export default Item;
