import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { store } from './app/store';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import StatsDashboard from './components/StatsDashboard';
import FeaturedArtists from './components/FeaturedArtists';
import GenreSelector from './components/GenreSelector';
import Testimonials from './components/Testimonials';
import AddSongForm from './components/AddSongForm';
import SongCard from './components/SongCard';
import LoadingSpinner from './components/LoadingSpinner';
import {
  fetchSongsStart,
  addSongStart,
  deleteSongStart
} from './features/songs/songsSlice';
import styled from '@emotion/styled';

const AppContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

const MainContent = styled.main`
  width: 100%;
`;

const Section = styled.section`
  padding: ${({ theme }) => theme.spacing(8)} 0;
  
  &.hero-section {
    padding-top: 0;
  }
  
  &.library-section {
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing(4)};
  
  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing(2)};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['3xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  text-align: center;
  position: relative;
  
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
`;

const SongsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing(3)};
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing(2)};
  }
`;

const AddSongSection = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing(6)};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
    text-align: center;
  }
`;

const SectionSubtitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(8)};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  h3 {
    font-size: ${({ theme }) => theme.fontSize.xl};
    margin-bottom: ${({ theme }) => theme.spacing(2)};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing(1)};
  }
`;

const StatsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatsBadge = styled.span`
  background: ${({ theme }) => theme.colors.primary}15;
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
`;

function SongsList() {
  const dispatch = useDispatch();
  const { list: songs, loading, error } = useSelector(state => state.songs);

  useEffect(() => {
    dispatch(fetchSongsStart());
  }, [dispatch]);

  const handleAddSong = (newSong) => {
    dispatch(addSongStart(newSong));
  };

  const handleDeleteSong = (id) => {
    dispatch(deleteSongStart(id));
  };

  const handlePlay = (song) => {
    console.log('Playing:', song.title);
    // TODO: Implement actual play functionality
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <AddSongSection>
        <SectionHeader>
          <SectionSubtitle>Add New Song</SectionSubtitle>
          <StatsInfo>
            <span>Manage your personal music collection</span>
          </StatsInfo>
        </SectionHeader>
        <AddSongForm onAdd={handleAddSong} />
      </AddSongSection>

      <SectionHeader>
        <SectionSubtitle>Your Personal Collection</SectionSubtitle>
        <StatsInfo>
          <StatsBadge>
            🎵 {songs.length} {songs.length === 1 ? 'song' : 'songs'}
          </StatsBadge>
          <span>Curated by you</span>
        </StatsInfo>
      </SectionHeader>

      {songs.length === 0 ? (
        <EmptyState>
          <h3>🎵 No songs yet</h3>
          <p>Add your first song to get started with your music collection!</p>
          <p>Start building your personal Ethiopian music library.</p>
        </EmptyState>
      ) : (
        <SongsGrid>
          {songs.map(song => (
            <SongCard 
              key={song.id} 
              song={song} 
              onDelete={handleDeleteSong}
              onPlay={handlePlay}
            />
          ))}
        </SongsGrid>
      )}
    </>
  );
}

function AppContent() {
  const [activeSection, setActiveSection] = useState('home');
  const { list: songs } = useSelector(state => state.songs);

  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenreSelect = (selectedGenres) => {
    console.log('Selected genres:', selectedGenres);
    // TODO: Implement genre filtering logic
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'library':
        return (
          <Section id="library" className="library-section">
            <Container>
              <SectionTitle>Your Music Library</SectionTitle>
              <SongsList />
            </Container>
          </Section>
        );
      
      case 'discover':
        return (
          <>
            <Section id="discover">
              <FeaturedArtists />
            </Section>
            <Section>
              <GenreSelector onGenreSelect={handleGenreSelect} />
            </Section>
          </>
        );
      
      case 'artists':
        return (
          <Section id="artists">
            <FeaturedArtists />
          </Section>
        );
      
      default: // 'home'
        return (
          <>
            {/* Hero Section */}
            <Section id="home" className="hero-section">
              <HeroBanner songsCount={songs.length} />
            </Section>
            
            {/* Statistics Dashboard */}
            <Section>
              <StatsDashboard />
            </Section>
            
            {/* Featured Artists Section */}
            <Section>
              <FeaturedArtists />
            </Section>
            
            {/* Genre Selection */}
            <Section>
              <GenreSelector onGenreSelect={handleGenreSelect} />
            </Section>
            
            {/* User Testimonials */}
            <Section>
              <Testimonials />
            </Section>
            
            {/* Music Library Preview */}
            <Section className="library-section">
              <Container>
                <SectionTitle>Your Music Library</SectionTitle>
                <SongsList />
              </Container>
            </Section>
          </>
        );
    }
  };

  return (
    <AppContainer>
      <Navbar activeSection={activeSection} onNavigate={handleNavigation} />
      <MainContent>
        {renderContent()}
      </MainContent>
    </AppContainer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <AppContent />
      </Layout>
    </Provider>
  );
}

export default App;
