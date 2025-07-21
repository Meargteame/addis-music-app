import React, { useState } from 'react';
import styled from '@emotion/styled';
import { FiPlay, FiPause, FiTrash2, FiHeart } from 'react-icons/fi';

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: transparent;
  }
`;

const AlbumArt = styled.div`
  width: 100%;
  height: 200px;
  background: ${({ gradient }) => gradient};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 70%
    );
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  ${Card}:hover &::before {
    transform: translateX(100%);
  }
`;

const AlbumIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const PlayOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  transition: all ${({ theme }) => theme.transitions.normal};
`;

const PlayButton = styled.button`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
`;

const SongHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const SongInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Artist = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  opacity: ${({ isVisible }) => isVisible ? 1 : 0};
  transition: all ${({ theme }) => theme.transitions.normal};
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ variant, theme }) => 
    variant === 'danger' ? theme.colors.error : 
    variant === 'favorite' ? theme.colors.accent : 
    theme.colors.text.light};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.1);
    background: ${({ variant, theme }) => 
      variant === 'danger' ? '#dc2626' : 
      variant === 'favorite' ? '#ec4899' : 
      theme.colors.text.secondary};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const AlbumYear = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.spacing(1)};
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.backgroundSecondary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

// Generate a consistent gradient based on song title
const generateGradient = (title, gradients) => {
  const index = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % gradients.length;
  return gradients[index];
};

const SongCard = ({ song, onDelete, onPlay }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${song.title}"?`)) {
      onDelete(song.id);
    }
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
    if (onPlay) {
      onPlay(song);
    }
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Get gradient from theme
  const gradient = generateGradient(song.title, [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #ff9d6c 0%, #bb4e75 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  ]);

  return (
    <Card
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AlbumArt gradient={gradient}>
        <AlbumIcon>🎵</AlbumIcon>
        <PlayOverlay isVisible={isHovered}>
          <PlayButton onClick={handlePlay}>
            {isPlaying ? <FiPause /> : <FiPlay />}
          </PlayButton>
        </PlayOverlay>
      </AlbumArt>
      
      <CardContent>
        <SongHeader>
          <SongInfo>
            <Title>{song.title}</Title>
            <Artist>by {song.artist}</Artist>
          </SongInfo>
          
          <ActionButtons isVisible={isHovered}>
            <ActionButton 
              variant="favorite" 
              onClick={handleFavorite}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <FiHeart fill={isFavorite ? "currentColor" : "none"} />
            </ActionButton>
            <ActionButton 
              variant="danger" 
              onClick={handleDelete}
              title="Delete song"
            >
              <FiTrash2 />
            </ActionButton>
          </ActionButtons>
        </SongHeader>
        
        <AlbumYear>
          {song.album && <Tag>📀 {song.album}</Tag>}
          {song.year && <Tag>📅 {song.year}</Tag>}
        </AlbumYear>
      </CardContent>
    </Card>
  );
};

export default SongCard;
