import React from "react"; 

const SongCard = ({song}) =>{
    return (
        <div style={{
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '10px',
            marginBottom: '1rem',
            background: '#f9f9f9'
        }}>
            <h2>{song.title}</h2>
            <p><strong>Artist:</strong>{song.artist} </p>
            <p><strong>Album:</strong>{song.album}</p>
            <p><strong>Year</strong>{song.year}</p>
    
        </div>
    )
}

export default SongCard;