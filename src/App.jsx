import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SongCard from './components/SongCard';
import AddSongForm from './components/AddSongForm';
import { addSong } from './features/songs/songsSlice';

const App = () => {
  const dispatch = useDispatch();
  const songs = useSelector(state => state.songs.list);

  const handleAddSong = (newSong) => {
    dispatch(addSong(newSong));
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
