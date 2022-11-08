import styled from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

interface ButtonContainerProps {
  variant: ButtonVariant;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;

  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.secondary};
  height: 40px;
`;
