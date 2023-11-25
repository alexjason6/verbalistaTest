import styled, {css} from 'styled-components/native';
import {Platform} from 'react-native';

interface Props {
  value?: string;
  correct?: boolean;
}

export const Text = styled.Text<Props>`
  font-size: ${Platform.OS === 'ios' ? '14px' : '16px'};
  font-weight: bold;
  color: ${({theme}) => theme.colors.grays.dark};

  ${({correct}) =>
    correct &&
    css`
      color: ${({theme}) => theme.colors.grays.lighter};
    `};
`;
