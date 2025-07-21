import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SongCard from './components/SongCard';
import AddSongForm from './components/AddSongForm';
import { addSong, deleteSong, fetchSongsStart } from './features/songs/songsSlice';

const App = () => {
  const dispatch = useDispatch();
  const { list: songs, loading } = useSelector(state => state.songs);

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  const handleAddSong = (newSong) => {
    dispatch(addSong(newSong));
  };

  const handleDeleteSong = (id) => {
    dispatch(deleteSong(id));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>AddisMusic 🎧</h1>
      <AddSongForm onAdd={handleAddSong} />
      {loading && <p>Loading songs...</p>}
      {songs.map(song => (
        <SongCard key={song.id} song={song} onDelete={handleDeleteSong} />
      ))}
    </div>
  );
};

export default App;
