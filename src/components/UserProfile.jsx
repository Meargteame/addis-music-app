import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { 
  FiMusic, 
  FiHeart, 
  FiPlay, 
  FiUser, 
  FiTrendingUp,
  FiSettings,
  FiEdit,
  FiStar,
  FiHeadphones,
  FiClock,
  FiAward,
  FiUsers,
  FiCalendar,
  FiMapPin,
  FiMic,
  FiDisc
} from 'react-icons/fi';

const slideUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(30px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const glow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(138, 43, 226, 0.3);
  }
  50% { 
    box-shadow: 0 0 30px rgba(138, 43, 226, 0.6);
  }
`;

const ProfileSection = styled.section`
  padding: ${({ theme }) => theme.spacing(8)} 0;
  background: ${({ theme }) => theme.colors.surface};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 200px;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}15, ${({ theme }) => theme.colors.secondary}15);
    z-index: 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing(4)};
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing(2)};
  }
`;

const ProfileCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  overflow: hidden;
  animation: ${slideUp} 0.8s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  }
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing(4)};
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: ${({ theme }) => theme.spacing(3)};
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: white;
  position: relative;
  animation: ${glow} 2s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    z-index: -1;
    opacity: 0.5;
    filter: blur(8px);
  }
  
  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    font-size: ${({ theme }) => theme.fontSize['2xl']};
  }
`;

const StatusIndicator = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.success};
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.background};
  animation: ${pulse} 2s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    inset: 2px;
    border-radius: 50%;
    background: white;
    opacity: 0.8;
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.xl};
    justify-content: center;
  }
`;

const VerifiedBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  color: white;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;

const UserRole = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const UserMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.light};
`;

const UserBio = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const ProfileActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  background: ${({ variant, theme }) => 
    variant === 'primary' 
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
      : 'transparent'
  };
  color: ${({ variant, theme }) => 
    variant === 'primary' ? 'white' : theme.colors.text.secondary
  };
  border: 1px solid ${({ variant, theme }) => 
    variant === 'primary' ? 'transparent' : theme.colors.border
  };
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ variant, theme }) => 
      variant === 'primary' ? 'transparent' : theme.colors.primary
    };
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(6)};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing(3)};
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(4)};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.normal};
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  }
`;

const StatIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ color, theme }) => color || theme.colors.primary}20;
  color: ${({ color, theme }) => color || theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  margin: 0 auto ${({ theme }) => theme.spacing(2)};
`;

const StatValue = styled.div`
  font-size: ${({ theme }) => theme.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const FavoriteGenres = styled.div`
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const GenreTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const GenreTag = styled.div`
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(3)};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}20, ${({ theme }) => theme.colors.secondary}20);
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  border: 1px solid ${({ theme }) => theme.colors.primary}30;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    color: white;
    transform: translateY(-2px);
  }
`;

const UserProfile = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const stats = [
    {
      icon: <FiMusic />,
      value: "2,547",
      label: "Songs Added",
      color: "#8B5CF6"
    },
    {
      icon: <FiHeart />,
      value: "342",
      label: "Favorites",
      color: "#EF4444"
    },
    {
      icon: <FiPlay />,
      value: "12.5K",
      label: "Hours Played",
      color: "#10B981"
    },
    {
      icon: <FiHeadphones />,
      value: "1,892",
      label: "Playlists",
      color: "#F59E0B"
    },
    {
      icon: <FiAward />,
      value: "47",
      label: "Achievements",
      color: "#8B5CF6"
    },
    {
      icon: <FiUsers />,
      value: "156",
      label: "Following",
      color: "#06B6D4"
    }
  ];

  const favoriteGenres = [
    "Pop", "Rock", "Hip Hop", "Jazz", "Electronic", "Classical", "R&B", "Country"
  ];

  return (
    <ProfileSection className={className}>
      <Container>
        <ProfileCard>
          <ProfileHeader>
            <AvatarContainer>
              <Avatar>
                M
                <StatusIndicator />
              </Avatar>
            </AvatarContainer>
            
            <UserInfo>
              <UserName>
                Meareg Teame
                <VerifiedBadge>
                  <FiStar />
                </VerifiedBadge>
              </UserName>
              <UserRole>Music Enthusiast & Curator</UserRole>
              <UserMeta>
                <MetaItem>
                  <FiMapPin />
                  Addis Ababa, Ethiopia
                </MetaItem>
                <MetaItem>
                  <FiCalendar />
                  Joined March 2024
                </MetaItem>
                <MetaItem>
                  <FiClock />
                  Last active now
                </MetaItem>
              </UserMeta>
              <UserBio>
                Passionate about discovering and sharing the rich musical heritage of Ethiopia. 
                Building the ultimate collection of traditional and modern Ethiopian music.
              </UserBio>
              
              <ProfileActions>
                <ActionButton variant="primary">
                  <FiEdit />
                  Edit Profile
                </ActionButton>
                <ActionButton>
                  <FiSettings />
                  Settings
                </ActionButton>
                <ActionButton>
                  <FiTrendingUp />
                  Analytics
                </ActionButton>
              </ProfileActions>
            </UserInfo>
          </ProfileHeader>

          <StatsGrid>
            {stats.map((stat, index) => (
              <StatCard key={index}>
                <StatIcon color={stat.color}>
                  {stat.icon}
                </StatIcon>
                <StatValue>{stat.value}</StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </StatsGrid>

          <FavoriteGenres>
            <SectionTitle>
              <FiMic />
              Favorite Genres
            </SectionTitle>
            <GenreTags>
              {favoriteGenres.map((genre, index) => (
                <GenreTag key={index}>
                  {genre}
                </GenreTag>
              ))}
            </GenreTags>
          </FavoriteGenres>
        </ProfileCard>
      </Container>
    </ProfileSection>
  );
};

export default UserProfile;
