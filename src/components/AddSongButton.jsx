import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { FiPlus, FiMusic } from 'react-icons/fi';

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
  50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.5); }
`;

const AddButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(4)};
  text-align: center;
`;

const AddButton = styled.button`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border: none;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: rotate(45deg);
    transition: all 0.6s ease;
    opacity: 0;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    animation: ${glow} 2s ease-in-out infinite;
  }

  &:hover::before {
    opacity: 1;
    transform: rotate(45deg) translate(50%, 50%);
  }

  &:active {
    transform: translateY(-2px) scale(1.02);
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const ButtonText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const AddButtonLabel = styled.h3`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0 0 ${({ theme }) => theme.spacing(2)} 0;
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const AddButtonDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  max-width: 400px;
  line-height: 1.5;
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const SecondaryAddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const AddSongButton = ({ onClick, variant = 'primary' }) => {
  if (variant === 'secondary') {
    return (
      <SecondaryAddButton onClick={onClick}>
        <FiPlus />
        Add Song
      </SecondaryAddButton>
    );
  }

  return (
    <AddButtonContainer>
      <AddButton onClick={onClick}>
        <FiPlus />
        <ButtonText>Add</ButtonText>
      </AddButton>
      
      <div>
        <AddButtonLabel>Add Your First Song</AddButtonLabel>
        <AddButtonDescription>
          Start building your personal music collection by adding your favorite Ethiopian songs, 
          artists, and albums to your library.
        </AddButtonDescription>
      </div>
    </AddButtonContainer>
  );
};

export default AddSongButton;
