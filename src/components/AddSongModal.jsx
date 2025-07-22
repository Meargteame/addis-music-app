import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { FiX, FiMusic, FiUser, FiDisc, FiCalendar } from 'react-icons/fi';
import AddSongForm from './AddSongForm';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { 
    opacity: 0; 
    transform: translate(-50%, -60%) scale(0.9); 
  }
  to { 
    opacity: 1; 
    transform: translate(-50%, -50%) scale(1); 
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-out;
  padding: ${({ theme }) => theme.spacing(4)};
`;

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 0.3s ease-out;
  
  @media (max-width: 768px) {
    max-width: 95vw;
    margin: ${({ theme }) => theme.spacing(2)};
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(6)} ${({ theme }) => theme.spacing(4)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(3)};
  }
`;

const ModalTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  
  .title-icon {
    width: 40px;
    height: 40px;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    border-radius: ${({ theme }) => theme.borderRadius.md};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
    
    .title-icon {
      width: 35px;
      height: 35px;
      font-size: ${({ theme }) => theme.fontSize.base};
    }
  }
`;

const CloseButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  font-size: ${({ theme }) => theme.fontSize.lg};

  &:hover {
    background: ${({ theme }) => theme.colors.error}10;
    border-color: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.error};
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing(6)};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing(4)};
  }
`;

const ModalDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  line-height: 1.6;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.sm};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

const FormContainer = styled.div`
  .add-song-form {
    background: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
  }
`;

const AddSongModal = ({ isOpen, onClose, onAdd }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleFormSubmit = (songData) => {
    onAdd(songData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>
            <div className="title-icon">
              <FiMusic />
            </div>
            Add New Song
          </ModalTitle>
          <CloseButton onClick={onClose} title="Close">
            <FiX />
          </CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <ModalDescription>
            Add a new song to your personal music collection. Fill in the details below to organize your library.
          </ModalDescription>
          
          <FormContainer>
            <AddSongForm 
              onAdd={handleFormSubmit}
              className="add-song-form"
            />
          </FormContainer>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddSongModal;
