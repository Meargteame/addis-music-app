import React from 'react';
import styled from '@emotion/styled';

const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  position: relative;
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: red;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
`;

const SongCard = ({ song, onDelete }) => (
  <Card>
    <Title>{song.title}</Title>
    <p><strong>Artist:</strong> {song.artist}</p>
    <p><strong>Album:</strong> {song.album}</p>
    <p><strong>Year:</strong> {song.year}</p>
    <DeleteButton onClick={() => onDelete(song.id)}>Delete</DeleteButton>
  </Card>
);

export default SongCard;
