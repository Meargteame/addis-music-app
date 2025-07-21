import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { FiPlay, FiHeart, FiMoreVertical } from 'react-icons/fi';

const fadeInUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
`;

const ArtistsSection = styled.section`
  padding: ${({ theme }) => theme.spacing(8)} 0;
  background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing(4)};
  
  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing(2)};
  }
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
    text-align: center;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const ViewAllButton = styled.button`
  padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const ArtistsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.spacing(3)};
  }
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;

const ArtistCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(3)};
  text-align: center;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  animation: ${fadeInUp} 0.6s ease-out;
  animation-delay: ${({ delay }) => delay || '0s'};
  animation-fill-mode: both;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:hover .artist-overlay {
    opacity: 1;
  }

  &:hover .artist-avatar {
    transform: scale(1.1);
  }
`;

const ArtistAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  margin: 0 auto ${({ theme }) => theme.spacing(3)};
  background: ${({ gradient }) => gradient || 'linear-gradient(135deg, #6366f1, #8b5cf6)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  position: relative;
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.normal};
  animation: ${float} 3s ease-in-out infinite;
  animation-delay: ${({ delay }) => delay || '0s'};
  
  @media (max-width: 480px) {
    width: 100px;
    height: 100px;
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const ArtistImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: ${({ src, gradient }) => 
    src ? `url(${src}) center/cover` : gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const ArtistOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all ${({ theme }) => theme.transitions.normal};
`;

const PlayButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  box-shadow: ${({ theme }) => theme.shadows.md};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: scale(1.1);
  }
`;

const ArtistInfo = styled.div`
  position: relative;
  z-index: 2;
`;

const ArtistName = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const ArtistGenre = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const ArtistStats = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(3)};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.light};
  
  @media (max-width: 480px) {
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;

const StatItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

const ActionButtons = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing(2)};
  right: ${({ theme }) => theme.spacing(2)};
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
  opacity: 0;
  transition: all ${({ theme }) => theme.transitions.normal};

  ${ArtistCard}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  backdrop-filter: blur(10px);

  &:hover {
    background: white;
    transform: scale(1.1);
  }

  &.favorite {
    color: ${({ isFavorite, theme }) => 
      isFavorite ? theme.colors.error : theme.colors.text.primary};
  }
`;

const FeaturedArtists = ({ className }) => {
  const [favorites, setFavorites] = useState(new Set());

  const artistsData = [
    {
      id: 'dorfus',
      name: 'Dorfus',
      genre: 'Traditional Jazz',
      avatar: null,
      gradient: 'linear-gradient(135deg, #667eea, #764ba2)',
      followers: '12K',
      tracks: '45',
      delay: '0.1s'
    },
    {
      id: 'martino',
      name: 'Martino',
      genre: 'Modern Ethiopian',
      avatar: null,
      gradient: 'linear-gradient(135deg, #ff9d6c, #bb4e75)',
      followers: '8.5K',
      tracks: '32',
      delay: '0.2s'
    },
    {
      id: 'zenash',
      name: 'Zenash Tsegaye',
      genre: 'Folk & Blues',
      avatar: null,
      gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)',
      followers: '15K',
      tracks: '67',
      delay: '0.3s'
    },
    {
      id: 'bekele',
      name: 'Bekele Molla',
      genre: 'Contemporary',
      avatar: null,
      gradient: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      followers: '22K',
      tracks: '89',
      delay: '0.4s'
    },
    {
      id: 'hana',
      name: 'Hana Girma',
      genre: 'Experimental',
      avatar: null,
      gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
      followers: '6.2K',
      tracks: '28',
      delay: '0.5s'
    },
    {
      id: 'samuel',
      name: 'Samuel Yirga',
      genre: 'Piano Jazz',
      avatar: null,
      gradient: 'linear-gradient(135deg, #f093fb, #f5576c)',
      followers: '18K',
      tracks: '54',
      delay: '0.6s'
    }
  ];

  const toggleFavorite = (artistId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(artistId)) {
        newFavorites.delete(artistId);
      } else {
        newFavorites.add(artistId);
      }
      return newFavorites;
    });
  };

  const handlePlayArtist = (artist) => {
    console.log('Playing artist:', artist.name);
    // TODO: Implement play functionality
  };

  return (
    <ArtistsSection className={className}>
      <Container>
        <SectionHeader>
          <SectionTitle>Featured Artists</SectionTitle>
          <ViewAllButton>View All Artists</ViewAllButton>
        </SectionHeader>
        
        <ArtistsGrid>
          {artistsData.map((artist) => (
            <ArtistCard 
              key={artist.id}
              delay={artist.delay}
              onClick={() => handlePlayArtist(artist)}
            >
              <ActionButtons>
                <ActionButton
                  className="favorite"
                  isFavorite={favorites.has(artist.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(artist.id);
                  }}
                >
                  <FiHeart fill={favorites.has(artist.id) ? "currentColor" : "none"} />
                </ActionButton>
                <ActionButton>
                  <FiMoreVertical />
                </ActionButton>
              </ActionButtons>

              <ArtistAvatar 
                className="artist-avatar"
                gradient={artist.gradient}
                delay={artist.delay}
              >
                <ArtistImage 
                  src={artist.avatar}
                  gradient={artist.gradient}
                >
                  {!artist.avatar && artist.name.charAt(0)}
                </ArtistImage>
                
                <ArtistOverlay className="artist-overlay">
                  <PlayButton onClick={(e) => {
                    e.stopPropagation();
                    handlePlayArtist(artist);
                  }}>
                    <FiPlay />
                  </PlayButton>
                </ArtistOverlay>
              </ArtistAvatar>
              
              <ArtistInfo>
                <ArtistName>{artist.name}</ArtistName>
                <ArtistGenre>{artist.genre}</ArtistGenre>
                <ArtistStats>
                  <StatItem>
                    <FiHeart />
                    {artist.followers}
                  </StatItem>
                  <StatItem>
                    <FiPlay />
                    {artist.tracks}
                  </StatItem>
                </ArtistStats>
              </ArtistInfo>
            </ArtistCard>
          ))}
        </ArtistsGrid>
      </Container>
    </ArtistsSection>
  );
};

export default FeaturedArtists;
