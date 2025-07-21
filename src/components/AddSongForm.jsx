import React, { useState } from 'react';
import styled from '@emotion/styled';

const Form = styled.form`
  display: grid;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-top: ${({ theme }) => theme.spacing(2)};
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "title artist"
      "album year"
      "button button";
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  
  &.title { grid-area: title; }
  &.artist { grid-area: artist; }
  &.album { grid-area: album; }
  &.year { grid-area: year; }
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(1.5)};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-family: inherit;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.light};
  }

  &:hover:not(:focus) {
    border-color: ${({ theme }) => theme.colors.text.light};
  }
`;

const SubmitButton = styled.button`
  grid-area: button;
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary},
    ${({ theme }) => theme.colors.primaryDark}
  );
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(1)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const AddSongForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    title: '',
    artist: '',
    album: '',
    year: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.artist.trim()) return;
    
    onAdd({ 
      ...form, 
      id: Date.now().toString(),
      title: form.title.trim(),
      artist: form.artist.trim(),
      album: form.album.trim(),
      year: form.year || null
    });
    
    setForm({ title: '', artist: '', album: '', year: '' });
  };

  const isFormValid = form.title.trim() && form.artist.trim();

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="title">
        <Label>
          Song Title <RequiredIndicator>*</RequiredIndicator>
        </Label>
        <Input 
          name="title" 
          value={form.title} 
          onChange={handleChange} 
          placeholder="Enter song title"
          required 
        />
      </FormGroup>

      <FormGroup className="artist">
        <Label>
          Artist <RequiredIndicator>*</RequiredIndicator>
        </Label>
        <Input 
          name="artist" 
          value={form.artist} 
          onChange={handleChange} 
          placeholder="Enter artist name"
          required 
        />
      </FormGroup>

      <FormGroup className="album">
        <Label>Album</Label>
        <Input 
          name="album" 
          value={form.album} 
          onChange={handleChange} 
          placeholder="Enter album name"
        />
      </FormGroup>

      <FormGroup className="year">
        <Label>Year</Label>
        <Input 
          name="year" 
          value={form.year} 
          onChange={handleChange} 
          placeholder="e.g., 2023"
          type="number"
          min="1900"
          max={new Date().getFullYear() + 5}
        />
      </FormGroup>

      <SubmitButton type="submit" disabled={!isFormValid}>
        <span>✨</span>
        Add Song
      </SubmitButton>
    </Form>
  );
};

export default AddSongForm;
