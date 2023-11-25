import styled, {css} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import {Dimensions} from 'react-native';

const {height} = Dimensions.get('screen');

type PropsStyles = {
  dropZone?: boolean;
  correct?: boolean | any;
  input?: boolean;
  draggable?: boolean;
};

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background: ${({theme}) => theme.colors.white};
`;

export const View = styled.View<PropsStyles>`
  margin-top: ${height >= 853 ? '18px' : '14px'};
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;

  ${({input}) =>
    input &&
    css`
      width: 68%;
      margin-right: 10px;
      justify-content: space-between;
      flex-wrap: nowrap;
    `};

  ${({dropZone}) =>
    dropZone &&
    css`
      padding: 0px;
      justify-content: space-between;
    `};

  ${({draggable}) =>
    draggable &&
    css`
      margin-top: 10px;
    `}
`;

export const Clear = styled.TouchableOpacity`
  width: 15px;
  height: 15px;
  background: transparent;
  position: absolute;
  right: 5px;
`;

export const IconClear = styled(Icon)`
  font-size: 15px;
  color: ${({theme}) => theme.colors.grays.light};
`;

export const Input = styled.TextInput<PropsStyles>`
  width: 100%;
  height: 40px;
  padding: 0px 10px;
  background: ${({theme}) => theme.colors.grays.lighter};
  border-radius: 4px;

  ${({correct, theme}) =>
    correct &&
    css`
      border-width: 2px;
      border-style: solid;
      border-color: ${theme.colors.greens.main};
    `};
`;

export const DropZone = styled.View<PropsStyles>`
  width: 100%;
  height: 40px;
  padding: 10px 10px;
  background: ${({theme}) => theme.colors.grays.lighter};
  border-radius: 4px;
`;

export const Text = styled.Text<PropsStyles>`
  font-size: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.grays.dark};

  ${({dropZone}) =>
    dropZone &&
    css`
      font-size: 14px;
      text-align: left;
      color: ${({theme}) => theme.colors.grays.main};
      font-weight: normal;
    `};
`;
