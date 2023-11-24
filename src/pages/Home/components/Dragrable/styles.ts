import styled from 'styled-components/native';

interface Props {
  value?: string;
}

export const Text = styled.Text<Props>`
  font-size: 14px;
  font-weight: bold;
  color: ${({theme}) => theme.colors.grays.dark};
`;
