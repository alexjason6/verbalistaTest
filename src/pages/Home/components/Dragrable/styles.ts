import styled, {css} from 'styled-components/native';
import {PixelRatio} from 'react-native';

const pr = PixelRatio.get();

console.log(pr);

interface Props {
  value?: string;
  correct?: boolean;
}

export const Text = styled.Text<Props>`
  font-size: ${pr <= 2 ? '16px' : '17px'};
  font-weight: bold;
  color: ${({theme}) => theme.colors.grays.dark};

  ${({correct}) =>
    correct &&
    css`
      color: ${({theme}) => theme.colors.grays.lighter};
    `};
`;
