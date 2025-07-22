import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { FiUsers, FiTrendingUp, FiStar, FiMusic, FiHeart, FiHeadphones } from 'react-icons/fi';
import { fetchStatsStart } from '../features/user/userSlice';
import { selectUserStats, selectUserLoading } from '../features/user/userSlice';

const countUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const StatsContainer = styled.section`
  padding: ${({ theme }) => theme.spacing(8)} 0;
  background: ${({ theme }) => theme.colors.backgroundSecondary};
`;

const StatsGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing(4)};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(3)};
    padding: 0 ${({ theme }) => theme.spacing(2)};
  }
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing(4)};
  box-shadow: ${({ theme }) => theme.shadows.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  animation: ${countUp} 0.6s ease-out;
  animation-delay: ${({ delay }) => delay || '0s'};
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ gradient }) => gradient || 'linear-gradient(90deg, #6366f1, #8b5cf6)'};
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(3)};
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ iconBg }) => iconBg || 'linear-gradient(135deg, #6366f1, #8b5cf6)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: white;
  animation: ${pulse} 2s ease-in-out infinite;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const StatTrend = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
  color: ${({ trend, theme }) => 
    trend === 'up' ? theme.colors.success : 
    trend === 'down' ? theme.colors.error : 
    theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSize.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

const StatNumber = styled.h3`
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.extrabold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  line-height: 1;
  
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
  }
`;

const StatLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSize.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StatDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.light};
  line-height: 1.5;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 ${({ theme }) => theme.spacing(4)};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const StatsDashboard = ({ className }) => {
  const dispatch = useDispatch();
  const stats = useSelector(selectUserStats);
  const loading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(fetchStatsStart());
  }, [dispatch]);

  // Default stats while loading or if no data
  const defaultStats = {
    total_songs: 47,
    total_artists: 12,
    popular_genres: { 'jazz': 8, 'pop': 6, 'traditional': 5 },
    total_plays: 1250
  };

  const currentStats = stats || defaultStats;

  const statsData = [
    {
      id: 'songs',
      number: currentStats.total_songs?.toString() || '0',
      label: 'Songs Collection',
      description: 'Curated Ethiopian tracks from traditional to modern',
      icon: <FiMusic />,
      iconBg: 'linear-gradient(135deg, #10b981, #059669)',
      gradient: 'linear-gradient(90deg, #10b981, #059669)',
      trend: 'up',
      trendValue: '+8%',
      delay: '0.1s'
    },
    {
      id: 'artists',
      number: currentStats.total_artists?.toString() || '0',
      label: 'Featured Artists',
      description: 'Ethiopian musicians and international collaborations',
      icon: <FiUsers />,
      iconBg: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      gradient: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
      trend: 'up',
      trendValue: '+12%',
      delay: '0.2s'
    },
    {
      id: 'plays',
      number: currentStats.total_plays?.toString() || '0',
      label: 'Total Plays',
      description: 'Songs played by music lovers worldwide',
      icon: <FiHeadphones />,
      iconBg: 'linear-gradient(135deg, #f59e0b, #d97706)',
      gradient: 'linear-gradient(90deg, #f59e0b, #d97706)',
      trend: 'up',
      trendValue: '+15%',
      delay: '0.3s'
    }
  ];

  if (loading && !stats) {
    return (
      <StatsContainer className={className}>
        <StatsGrid>
          <div>Loading statistics...</div>
        </StatsGrid>
      </StatsContainer>
    );
  }

  return (
    <StatsContainer className={className}>
      <SectionHeader>
        <SectionTitle>Trusted by Music Lovers</SectionTitle>
        <SectionSubtitle>
          Join thousands of users discovering and enjoying Ethiopian music through our platform
        </SectionSubtitle>
      </SectionHeader>
      
      <StatsGrid>
        {statsData.map((stat) => (
          <StatCard 
            key={stat.id}
            delay={stat.delay}
            gradient={stat.gradient}
          >
            <StatHeader>
              <StatIcon iconBg={stat.iconBg}>
                {stat.icon}
              </StatIcon>
              <StatTrend trend={stat.trend}>
                <FiTrendingUp />
                {stat.trendValue}
              </StatTrend>
            </StatHeader>
            
            <StatNumber>{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
            <StatDescription>{stat.description}</StatDescription>
          </StatCard>
        ))}
      </StatsGrid>
    </StatsContainer>
  );
};

export default StatsDashboard;
