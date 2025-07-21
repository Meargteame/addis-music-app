import React, { useState } from 'react';
import styled from '@emotion/styled';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing(1)};
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(1)};
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #303f9f;
  }
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
    if (!form.title || !form.artist) return;
    onAdd({ ...form, id: Date.now().toString() });
    setForm({ title: '', artist: '', album: '', year: '' });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>Add New Song</h2>
      <Input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <Input name="artist" value={form.artist} onChange={handleChange} placeholder="Artist" required />
      <Input name="album" value={form.album} onChange={handleChange} placeholder="Album" />
      <Input name="year" value={form.year} onChange={handleChange} placeholder="Year" type="number" />
      <Button type="submit">Add Song</Button>
    </Form>
  );
};

export default AddSongForm;
