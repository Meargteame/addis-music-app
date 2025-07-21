import React, { useState } from 'react';
import SongCard from './components/SongCard';
import AddSongForm from './components/AddSongForm';

const App = () => {
  const [songs, setSongs] = useState([
    { id: 1, title: 'Afro Vibe', artist: 'Yared Beats', album: 'Ethiowave', year: 2023 },
    { id: 2, title: 'Roha Funk', artist: 'Roha Band', album: 'Roha Classics', year: 1998 }
  ]);

  const handleAddSong = (newSong) => {
    setSongs(prev => [newSong, ...prev]);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>AddisMusic 🎧</h1>
      <AddSongForm onAdd={handleAddSong} />
      {songs.map(song => (
        <SongCard key={song.id} song={song} />
      ))}
    </div>
  );
};

export default App;
