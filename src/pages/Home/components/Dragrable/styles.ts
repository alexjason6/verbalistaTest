import styled, {css} from 'styled-components/native';

interface Props {
  value?: string;
  correct?: boolean;
}

export const Text = styled.Text<Props>`
  font-size: 14px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.grays.dark};

  ${({correct}) =>
    correct &&
    css`
      color: ${({theme}) => theme.colors.grays.lighter};
    `};
`;
