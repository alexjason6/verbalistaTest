import styled, {css} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

type PropsStyles = {
  dropZone?: boolean;
  correct?: boolean | any;
  input?: boolean;
};

export const SafeArea = styled.SafeAreaView`
  flex: 1;
  background: ${({theme}) => theme.colors.white};
`;

export const Container = styled.View`
  padding-top: 20px;
`;

export const View = styled.View<PropsStyles>`
  margin: 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  ${({input}) =>
    input &&
    css`
      flex-direction: row;
    `};

  ${({dropZone}) =>
    dropZone &&
    css`
      margin: 20px 20px 10px 20px;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    `};
`;

export const Clear = styled(Icon)`
  font-size: 15px;
  position: absolute;
  right: 10;
`;

export const Input = styled.TextInput<PropsStyles>`
  width: 70%;
  height: 40px;
  padding: 0px 10px;
  background: ${({theme}) => theme.colors.grays.lighter};
  border-radius: 4px;
  flex: 1;

  ${({correct, theme}) =>
    correct &&
    css`
      border-width: 2px;
      border-style: solid;
      border-color: ${theme.colors.greens.main};
    `};
`;

export const DropZone = styled.View`
  width: 70%;
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
