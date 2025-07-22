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
  FiDisc,
  FiArrowLeft,
  FiShare2,
  FiMoreHorizontal,
  FiCamera,
  FiMail,
  FiPhone,
  FiGlobe
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

const ProfilePageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding-top: 80px; // Account for navbar height
`;

const ProfileHero = styled.section`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}20, ${({ theme }) => theme.colors.secondary}20);
  padding: ${({ theme }) => theme.spacing(8)} 0;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="30" cy="30" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="70" cy="70" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="90" cy="90" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
    opacity: 0.3;
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

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(2)} ${({ theme }) => theme.spacing(4)};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  margin-bottom: ${({ theme }) => theme.spacing(4)};

  &:hover {
    transform: translateX(-4px);
    box-shadow: ${({ theme }) => theme.shadows.md};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const HeroContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(6)};
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: ${({ theme }) => theme.spacing(4)};
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: white;
  position: relative;
  animation: ${glow} 2s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    inset: -6px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    z-index: -1;
    opacity: 0.5;
    filter: blur(12px);
  }
  
  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
    font-size: ${({ theme }) => theme.fontSize['3xl']};
  }
`;

const EditAvatarButton = styled.button`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 40px;
  height: 40px;
  background: ${({ theme }) => theme.colors.primary};
  border: 3px solid ${({ theme }) => theme.colors.background};
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: scale(1.1);
  }
`;

const StatusIndicator = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.success};
  border-radius: 50%;
  border: 4px solid ${({ theme }) => theme.colors.background};
  animation: ${pulse} 2s ease-in-out infinite;
  
  &::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background: white;
    opacity: 0.8;
  }
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h1`
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
    justify-content: center;
  }
`;

const VerifiedBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  color: white;
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const UserRole = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const UserMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  
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
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.light};
`;

const UserBio = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  max-width: 600px;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  
  @media (max-width: 768px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const ActionButton = styled.button`
  padding: ${({ theme }) => theme.spacing(3)} ${({ theme }) => theme.spacing(6)};
  background: ${({ variant, theme }) => 
    variant === 'primary' 
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`
      : 'transparent'
  };
  color: ${({ variant, theme }) => 
    variant === 'primary' ? 'white' : theme.colors.text.secondary
  };
  border: 2px solid ${({ variant, theme }) => 
    variant === 'primary' ? 'transparent' : theme.colors.border
  };
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSize.base};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};

  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
    border-color: ${({ variant, theme }) => 
      variant === 'primary' ? 'transparent' : theme.colors.primary
    };
  }
`;

const ProfileContent = styled.div`
  padding: ${({ theme }) => theme.spacing(8)} 0;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing(6)};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(4)};
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(6)};
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing(6)};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  animation: ${slideUp} 0.6s ease-out;
  animation-delay: ${({ delay }) => delay || '0s'};
  animation-fill-mode: both;
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing(4)};
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background};
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
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
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

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(3)};
  padding: ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}10;
  }
`;

const ContactIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.primary}20;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
`;

const ContactText = styled.div`
  flex: 1;
`;

const ContactLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.light};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
`;

const ContactValue = styled.div`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const UserProfilePage = ({ onBack }) => {
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
    "Pop", "Rock", "Hip Hop", "Jazz", "Electronic", "Classical", "R&B", "Country", "Folk", "Reggae"
  ];

  return (
    <ProfilePageContainer>
      <ProfileHero>
        <Container>
          <BackButton onClick={onBack}>
            <FiArrowLeft />
            Back to Home
          </BackButton>
          
          <HeroContent>
            <AvatarContainer>
              <Avatar>
                M
                <StatusIndicator />
              </Avatar>
              <EditAvatarButton>
                <FiCamera />
              </EditAvatarButton>
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
                Building the ultimate collection of traditional and modern Ethiopian music to preserve 
                our cultural sounds for future generations.
              </UserBio>
              
              <ProfileActions>
                <ActionButton variant="primary">
                  <FiEdit />
                  Edit Profile
                </ActionButton>
                <ActionButton>
                  <FiShare2 />
                  Share Profile
                </ActionButton>
                <ActionButton>
                  <FiSettings />
                  Settings
                </ActionButton>
                <ActionButton>
                  <FiMoreHorizontal />
                </ActionButton>
              </ProfileActions>
            </UserInfo>
          </HeroContent>
        </Container>
      </ProfileHero>

      <ProfileContent>
        <Container>
          <ContentGrid>
            <MainContent>
              <Card delay="0.1s">
                <CardTitle>
                  <FiTrendingUp />
                  Music Statistics
                </CardTitle>
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
              </Card>

              <Card delay="0.2s">
                <CardTitle>
                  <FiMic />
                  Favorite Genres
                </CardTitle>
                <GenreTags>
                  {favoriteGenres.map((genre, index) => (
                    <GenreTag key={index}>
                      {genre}
                    </GenreTag>
                  ))}
                </GenreTags>
              </Card>
            </MainContent>

            <Sidebar>
              <Card delay="0.3s">
                <CardTitle>
                  <FiUser />
                  Contact Information
                </CardTitle>
                <ContactInfo>
                  <ContactItem>
                    <ContactIcon>
                      <FiMail />
                    </ContactIcon>
                    <ContactText>
                      <ContactLabel>Email</ContactLabel>
                      <ContactValue>meareg@addismusic.com</ContactValue>
                    </ContactText>
                  </ContactItem>
                  <ContactItem>
                    <ContactIcon>
                      <FiPhone />
                    </ContactIcon>
                    <ContactText>
                      <ContactLabel>Phone</ContactLabel>
                      <ContactValue>+251 911 234 567</ContactValue>
                    </ContactText>
                  </ContactItem>
                  <ContactItem>
                    <ContactIcon>
                      <FiGlobe />
                    </ContactIcon>
                    <ContactText>
                      <ContactLabel>Website</ContactLabel>
                      <ContactValue>addismusic.com</ContactValue>
                    </ContactText>
                  </ContactItem>
                  <ContactItem>
                    <ContactIcon>
                      <FiMapPin />
                    </ContactIcon>
                    <ContactText>
                      <ContactLabel>Location</ContactLabel>
                      <ContactValue>Addis Ababa, Ethiopia</ContactValue>
                    </ContactText>
                  </ContactItem>
                </ContactInfo>
              </Card>

              <Card delay="0.4s">
                <CardTitle>
                  <FiAward />
                  Recent Achievements
                </CardTitle>
                <ContactInfo>
                  <ContactItem>
                    <ContactIcon style={{ background: '#F59E0B20', color: '#F59E0B' }}>
                      <FiStar />
                    </ContactIcon>
                    <ContactText>
                      <ContactLabel>Music Curator</ContactLabel>
                      <ContactValue>Added 100+ songs</ContactValue>
                    </ContactText>
                  </ContactItem>
                  <ContactItem>
                    <ContactIcon style={{ background: '#10B98120', color: '#10B981' }}>
                      <FiHeart />
                    </ContactIcon>
                    <ContactText>
                      <ContactLabel>Music Lover</ContactLabel>
                      <ContactValue>1000+ hours played</ContactValue>
                    </ContactText>
                  </ContactItem>
                  <ContactItem>
                    <ContactIcon style={{ background: '#EF444420', color: '#EF4444' }}>
                      <FiUsers />
                    </ContactIcon>
                    <ContactText>
                      <ContactLabel>Community Builder</ContactLabel>
                      <ContactValue>50+ followers</ContactValue>
                    </ContactText>
                  </ContactItem>
                </ContactInfo>
              </Card>
            </Sidebar>
          </ContentGrid>
        </Container>
      </ProfileContent>
    </ProfilePageContainer>
  );
};

export default UserProfilePage;
