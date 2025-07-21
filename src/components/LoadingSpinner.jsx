import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(6)};
  gap: ${({ theme }) => theme.spacing(2)};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 3px solid ${({ theme }) => theme.colors.border};
  border-top: 3px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  animation: ${pulse} 2s ease-in-out infinite;
  margin: 0;
`;

const MusicNote = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingSpinner = ({ text = 'Loading your music...' }) => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>
        <MusicNote>🎵</MusicNote> {text}
      </LoadingText>
    </LoadingContainer>
  );
};

export default LoadingSpinner;
