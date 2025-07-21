import React from "react";
import SongCard from "./components/SongCard";



const mockSongs = [
    { id: 1, title: 'Afro Vibe', artist: 'Yared Beats', album: 'Ethiowave', year: 2023 },
    { id: 2, title: 'Roha Funk', artist: 'Roha Band', album: 'Roha Classics', year: 1998 },
    { id: 3, title: 'Jazz in Addis', artist: 'Mulatu Astatke', album: 'Sketches', year: 1975 }
]



const App = () => {
    return (
        <div style={{padding:'2rem'}}>
            <h1>Hello, AddisMusic! 🎧</h1>
            {
                mockSongs.map(
                    song => (
                        <SongCard key={song.id} song={song} />
                    )
                )
            }
        </div>
        // 
    )
}
export default App;

