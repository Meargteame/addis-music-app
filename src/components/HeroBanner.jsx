import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { FiPlay, FiArrowRight, FiMusic, FiUsers, FiStar } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

// Floating animation for background elements
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const slideIn = keyframes`
  0% { opacity: 0; transform: translateY(30px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const HeroContainer = styled.div`
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.mode === 'dark' 
      ? 'rgba(15, 23, 42, 0.95)' 
      : 'rgba(99, 102, 241, 0.95)'} 0%,
    ${({ theme }) => theme.mode === 'dark' 
      ? 'rgba(30, 41, 59, 0.90)' 
      : 'rgba(139, 92, 246, 0.90)'} 50%,
    ${({ theme }) => theme.mode === 'dark' 
      ? 'rgba(51, 65, 85, 0.85)' 
      : 'rgba(236, 72, 153, 0.85)'} 100%
  );
  position: relative;
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(10)} ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(12)};
  margin: -${({ theme }) => theme.spacing(3)} -${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(8)};
  border-radius: 0 0 ${({ theme }) => theme.borderRadius.xl} ${({ theme }) => theme.borderRadius.xl};
  min-height: 80vh;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    margin: -${({ theme }) => theme.spacing(2)} -${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(6)};
    padding: ${({ theme }) => theme.spacing(8)} ${({ theme }) => theme.spacing(2)};
    min-height: 70vh;
  }

  /* Animated background pattern */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 2px, transparent 2px),
      radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 60px 60px, 40px 40px;
    animation: ${float} 20s ease-in-out infinite;
  }

  /* Floating music notes */
  &::after {
    content: '🎵 🎶 🎼 ♪ ♫';
    position: absolute;
    top: 20%;
    right: 10%;
    font-size: 2rem;
    opacity: 0.1;
    animation: ${float} 15s ease-in-out infinite reverse;
    letter-spacing: 2rem;
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing(8)};
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    gap: ${({ theme }) => theme.spacing(6)};
  }
`;

const HeroText = styled.div`
  animation: ${slideIn} 1s ease-out;
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSize['5xl']};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  line-height: 1.1;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize['3xl']};
  }
  
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  line-height: 1.6;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  border: 2px solid transparent;
  text-decoration: none;
  
  @media (max-width: 480px) {
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(2.5)} ${({ theme }) => theme.spacing(4)};
  }
`;

const PrimaryButton = styled(Button)`
  background: rgba(255, 255, 255, 0.95);
  color: ${({ theme }) => theme.colors.primary};
  border-color: rgba(255, 255, 255, 0.95);

  &:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: white;
  border-color: rgba(255, 255, 255, 0.5);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.8);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const HeroVisual = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${slideIn} 1s ease-out 0.2s both;
  
  @media (max-width: 768px) {
    order: -1;
  }
`;

const MusicPlayer = styled.div`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  min-width: 280px;
  
  @media (max-width: 480px) {
    min-width: 240px;
    padding: ${({ theme }) => theme.spacing(3)};
  }
`;

const PlayerIcon = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  color: white;
  margin: 0 auto ${({ theme }) => theme.spacing(3)};
  animation: ${float} 3s ease-in-out infinite;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`;

const PlayerInfo = styled.div`
  color: white;
  
  h3 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
  
  p {
    font-size: ${({ theme }) => theme.fontSize.sm};
    opacity: 0.8;
  }
`;

const StatsPreview = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing(4)};
  
  @media (max-width: 480px) {
    justify-content: center;
    gap: ${({ theme }) => theme.spacing(6)};
  }
`;

const StatItem = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  
  .number {
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-weight: ${({ theme }) => theme.fontWeight.bold};
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  }
  
  .label {
    font-size: ${({ theme }) => theme.fontSize.sm};
    opacity: 0.8;
  }
`;

const HeroBanner = ({ className, songsCount = 0 }) => {
  const handleGetStarted = () => {
    document.querySelector('[data-section="add-song"]')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };
  
  const handleSeeMore = () => {
    document.querySelector('[data-section="music-collection"]')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };
  
  return (
    <HeroContainer>
      <HeroContent>
        <HeroText>
          <HeroTitle>
            Music Is The<br />
            Shorthand Of<br />
            <span style={{ background: 'linear-gradient(45deg, #fbbf24, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Emotion
            </span>
          </HeroTitle>
          
          <HeroSubtitle>
            Discover, organize, and celebrate the rich sounds of Ethiopian music. 
            Build your personal collection and connect with the rhythm of your heritage.
            {songsCount > 0 && (
              <span style={{ display: 'block', marginTop: '8px', color: '#10b981' }}>
                You have {songsCount} {songsCount === 1 ? 'song' : 'songs'} in your collection!
              </span>
            )}
          </HeroSubtitle>
          
          <ButtonGroup>
            <PrimaryButton onClick={handleGetStarted}>
              <FiPlay />
              Get Started
            </PrimaryButton>
            
            <SecondaryButton onClick={handleSeeMore}>
              See More
              <FiArrowRight />
            </SecondaryButton>
          </ButtonGroup>
          
          <StatsPreview>
            <StatItem>
              <span className="number">{songsCount}</span>
              <span className="label">Songs</span>
            </StatItem>
            <StatItem>
              <span className="number">5+</span>
              <span className="label">Genres</span>
            </StatItem>
            <StatItem>
              <span className="number">100%</span>
              <span className="label">Ethiopian</span>
            </StatItem>
          </StatsPreview>
        </HeroText>
        
        <HeroVisual>
          <MusicPlayer>
            <PlayerIcon>
              <FiMusic />
            </PlayerIcon>
            <PlayerInfo>
              <h3>Now Playing</h3>
              <p>Ethiopian Classics</p>
            </PlayerInfo>
          </MusicPlayer>
        </HeroVisual>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroBanner;
