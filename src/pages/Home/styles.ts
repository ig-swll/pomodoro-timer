import styled from 'styled-components';

export const HomeContainer = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
  flex-wrap: wrap;
`;

export const CountdownContainer = styled.div`
  font-family: 'Roboto Mono', monospace;
  font-weight: 700;
  font-size: 10rem;
  line-height: 8rem;
  color: ${({ theme }) => theme['gray-100']};
  display: flex;
  gap: 1rem;
  user-select: none;

  span {
    background-color: ${({ theme }) => theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

export const CountdownSeparator = styled.div`
  padding: 2rem 0;
  color: ${({ theme }) => theme['green-500']};
`;

const BaseCountdownButton = styled.button`
  background: ${({ theme }) => theme['gray-400']};
  color: ${({ theme }) => theme['gray-100']};
  width: 100%;
  border: 0;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.1s ease-in-out;

  gap: 0.5rem;
  font-weight: 700;

  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme['green-700']};
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  background: ${({ theme }) => theme['red-500']};

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme['red-700']};
  }
`;

const BaseInput = styled.input`
  background: transparent;
  height: 2.5rem;
  border: 0;
  border-bottom: 2px solid ${({ theme }) => theme['gray-500']};
  font-weight: 700;
  font-size: 1.125rem;
  padding: 0 0.5rem;
  color: ${({ theme }) => theme['gray-100']};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme['green-300']};
  }

  &::placeholder {
    color: ${({ theme }) => theme['gray-500']};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;
