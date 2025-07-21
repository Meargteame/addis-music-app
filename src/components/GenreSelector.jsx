import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { 
  FiMusic, 
  FiHeart, 
  FiTrendingUp, 
  FiStar, 
  FiHeadphones,
  FiMic,
  FiDisc,
  FiRadio
} from 'react-icons/fi';

const slideInLeft = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(-30px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const GenreSection = styled.section`
  padding: ${({ theme }) => theme.spacing(8)} 0;
  background: ${({ theme }) => theme.colors.surface};
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
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const GenreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: ${({ theme }) => theme.spacing(3)};
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;

const GenreCard = styled.div`
  background: ${({ theme, isSelected }) => 
    isSelected 
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
      : theme.colors.background
  };
  border: 2px solid ${({ theme, isSelected }) => 
    isSelected ? 'transparent' : theme.colors.border
  };
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(4)};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;
  animation: ${slideInLeft} 0.6s ease-out;
  animation-delay: ${({ delay }) => delay || '0s'};
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme, isSelected }) => 
      isSelected ? 'transparent' : theme.colors.primary
    };
  }

  &:hover .genre-icon {
    animation: ${pulse} 1s ease-in-out infinite;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: ${({ theme, isSelected }) => 
      isSelected 
        ? 'rgba(255, 255, 255, 0.1)'
        : `linear-gradient(135deg, ${theme.colors.primary}15, ${theme.colors.secondary}15)`
    };
    border-radius: 50%;
    transform: translate(30px, -30px);
    transition: all ${({ theme }) => theme.transitions.normal};
  }

  &:hover::before {
    transform: translate(20px, -20px) scale(1.2);
  }
`;

const GenreHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  position: relative;
  z-index: 2;
`;

const GenreIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme, isSelected }) => 
    isSelected 
      ? 'rgba(255, 255, 255, 0.2)'
      : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
  };
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  color: ${({ theme, isSelected }) => 
    isSelected ? 'white' : 'white'
  };
  transition: all ${({ theme }) => theme.transitions.normal};
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: ${({ theme }) => theme.fontSize.xl};
  }
`;

const GenreInfo = styled.div`
  flex: 1;
`;

const GenreTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme, isSelected }) => 
    isSelected ? 'white' : theme.colors.text.primary
  };
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const GenreCount = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme, isSelected }) => 
    isSelected ? 'rgba(255, 255, 255, 0.8)' : theme.colors.text.secondary
  };
`;

const GenreDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme, isSelected }) => 
    isSelected ? 'rgba(255, 255, 255, 0.9)' : theme.colors.text.light
  };
  line-height: 1.5;
  position: relative;
  z-index: 2;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const GenreStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme, isSelected }) => 
    isSelected ? 'rgba(255, 255, 255, 0.8)' : theme.colors.text.light
  };
`;

const TrendingBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
  background: ${({ theme, isSelected }) => 
    isSelected 
      ? 'rgba(255, 255, 255, 0.2)'
      : theme.colors.warning + '20'
  };
  color: ${({ theme, isSelected }) => 
    isSelected ? 'white' : theme.colors.warning
  };
  padding: ${({ theme }) => theme.spacing(0.5)} ${({ theme }) => theme.spacing(1)};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const FilterTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing(1)};
  }
`;

const FilterTab = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  background: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : 'transparent'
  };
  color: ${({ theme, isActive }) => 
    isActive ? 'white' : theme.colors.text.secondary
  };
  border: 2px solid ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.border
  };
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme, isActive }) => 
      isActive ? 'white' : theme.colors.primary
    };
  }
  
  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing(1.5)} ${({ theme }) => theme.spacing(3)};
    font-size: ${({ theme }) => theme.fontSize.xs};
  }
`;

const GenreSelector = ({ className, onGenreSelect }) => {
  const [selectedGenres, setSelectedGenres] = useState(new Set(['pop']));
  const [activeFilter, setActiveFilter] = useState('popular');

  const genresData = [
    {
      id: 'pop',
      title: 'Pop Music',
      count: '2,547 songs',
      description: 'Catchy melodies and modern rhythms that define contemporary music',
      icon: <FiMusic />,
      listeners: '124K',
      trending: true,
      delay: '0.1s'
    },
    {
      id: 'rock',
      title: 'Rock & Alternative',
      count: '1,892 songs',
      description: 'Powerful guitar riffs and energetic beats for the rebellious soul',
      icon: <FiHeadphones />,
      listeners: '98K',
      trending: false,
      delay: '0.2s'
    },
    {
      id: 'hiphop',
      title: 'Hip Hop & Rap',
      count: '3,156 songs',
      description: 'Urban beats with powerful lyrics and creative wordplay',
      icon: <FiMic />,
      listeners: '156K',
      trending: true,
      delay: '0.3s'
    },
    {
      id: 'jazz',
      title: 'Jazz & Blues',
      count: '987 songs',
      description: 'Smooth improvisations and soulful melodies from legendary artists',
      icon: <FiDisc />,
      listeners: '67K',
      trending: false,
      delay: '0.4s'
    },
    {
      id: 'electronic',
      title: 'Electronic & EDM',
      count: '2,234 songs',
      description: 'Digital soundscapes and pulsating rhythms for the dance floor',
      icon: <FiRadio />,
      listeners: '189K',
      trending: true,
      delay: '0.5s'
    },
    {
      id: 'classical',
      title: 'Classical & Orchestra',
      count: '756 songs',
      description: 'Timeless compositions from the greatest musical minds in history',
      icon: <FiStar />,
      listeners: '45K',
      trending: false,
      delay: '0.6s'
    }
  ];

  const filterTabs = [
    { id: 'popular', label: 'Most Popular' },
    { id: 'trending', label: 'Trending Now' },
    { id: 'new', label: 'New Releases' },
    { id: 'favorites', label: 'Your Favorites' }
  ];

  const toggleGenre = (genreId) => {
    setSelectedGenres(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(genreId)) {
        newSelected.delete(genreId);
      } else {
        newSelected.add(genreId);
      }
      
      if (onGenreSelect) {
        onGenreSelect(Array.from(newSelected));
      }
      
      return newSelected;
    });
  };

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    // TODO: Implement filter logic
  };

  return (
    <GenreSection className={className}>
      <Container>
        <SectionHeader>
          <SectionTitle>Explore by Genre</SectionTitle>
          <SectionSubtitle>
            Discover your perfect sound across diverse musical landscapes
          </SectionSubtitle>
        </SectionHeader>

        <FilterTabs>
          {filterTabs.map((tab) => (
            <FilterTab
              key={tab.id}
              isActive={activeFilter === tab.id}
              onClick={() => handleFilterChange(tab.id)}
            >
              {tab.label}
            </FilterTab>
          ))}
        </FilterTabs>
        
        <GenreGrid>
          {genresData.map((genre) => (
            <GenreCard
              key={genre.id}
              isSelected={selectedGenres.has(genre.id)}
              delay={genre.delay}
              onClick={() => toggleGenre(genre.id)}
            >
              <GenreHeader>
                <GenreIconWrapper 
                  className="genre-icon"
                  isSelected={selectedGenres.has(genre.id)}
                >
                  {genre.icon}
                </GenreIconWrapper>
                <GenreInfo>
                  <GenreTitle isSelected={selectedGenres.has(genre.id)}>
                    {genre.title}
                  </GenreTitle>
                  <GenreCount isSelected={selectedGenres.has(genre.id)}>
                    {genre.count}
                  </GenreCount>
                </GenreInfo>
              </GenreHeader>
              
              <GenreDescription isSelected={selectedGenres.has(genre.id)}>
                {genre.description}
              </GenreDescription>
              
              <GenreStats>
                <StatItem isSelected={selectedGenres.has(genre.id)}>
                  <FiHeart />
                  {genre.listeners}
                </StatItem>
                {genre.trending && (
                  <TrendingBadge isSelected={selectedGenres.has(genre.id)}>
                    <FiTrendingUp />
                    Trending
                  </TrendingBadge>
                )}
              </GenreStats>
            </GenreCard>
          ))}
        </GenreGrid>
      </Container>
    </GenreSection>
  );
};

export default GenreSelector;
