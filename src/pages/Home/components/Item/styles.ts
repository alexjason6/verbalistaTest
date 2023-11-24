import styled, {css} from 'styled-components/native';

type PropsStyles = {
  dropZone?: boolean;
};

export const View = styled.View<PropsStyles>`
  margin: 20px 20px 10px 20px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

export const Input = styled.TextInput`
  width: 70%;
  height: 40px;
  padding: 0px 10px;
  background: ${({theme}) => theme.colors.grays.lighter};
  border-radius: 4px;
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
