import React from "react"; 
import styled from '@emotion/styled';


const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;


const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
`;


const SongCard = ({song}) =>{
    return (
        <div style={{
            padding: '1rem',
            border: '1px solid #ddd',
            borderRadius: '10px',
            marginBottom: '1rem',
            background: '#f9f9f9'
        }}>
            <Card>
                <h2>{song.title}</h2>
                <p><strong>Artist:</strong>{song.artist} </p>
                <p><strong>Album:</strong>{song.album}</p>
                <p><strong>Year</strong>{song.year}</p>
            </Card>
    
        </div>
    )
}

export default SongCard;
