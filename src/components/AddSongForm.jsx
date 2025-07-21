import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <h2>Add New Song</h2>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
      <input name="artist" value={form.artist} onChange={handleChange} placeholder="Artist" required />
      <input name="album" value={form.album} onChange={handleChange} placeholder="Album" />
      <input name="year" value={form.year} onChange={handleChange} placeholder="Year" type="number" />
      <button type="submit">Add Song</button>
    </form>
  );
};

export default AddSongForm;
