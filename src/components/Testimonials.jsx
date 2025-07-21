import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { 
  FiStar, 
  FiChevronLeft, 
  FiChevronRight,
  FiMessageCircle,
  FiPlay,
  FiHeart
} from 'react-icons/fi';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

const slideIn = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(50px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
`;

const TestimonialsSection = styled.section`
  padding: ${({ theme }) => theme.spacing(12)} 0;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.colors.background} 0%,
    ${({ theme }) => theme.colors.surface} 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, ${({ theme }) => theme.colors.primary}15 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, ${({ theme }) => theme.colors.secondary}15 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing(4)};
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing(2)};
  }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(8)};
  animation: ${fadeIn} 0.8s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSize['4xl']};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(3)};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    border-radius: 2px;
  }
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize['3xl']};
  }
  
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSize['2xl']};
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const TestimonialCarousel = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const TestimonialTrack = styled.div`
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-${({ currentIndex }) => currentIndex * 100}%);
`;

const TestimonialSlide = styled.div`
  min-width: 100%;
  padding: ${({ theme }) => theme.spacing(6)};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing(4)};
  }
`;

const TestimonialCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing(8)};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  animation: ${slideIn} 0.6s ease-out;
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: opacity ${({ theme }) => theme.transitions.normal};
  }

  &:hover::before {
    opacity: 0.1;
  }
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing(6)};
  }
  
  @media (max-width: 480px) {
    padding: ${({ theme }) => theme.spacing(4)};
  }
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing(4)};
  left: ${({ theme }) => theme.spacing(4)};
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${({ theme }) => theme.fontSize.xl};
  animation: ${float} 3s ease-in-out infinite;
  
  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: ${({ theme }) => theme.fontSize.lg};
    top: ${({ theme }) => theme.spacing(3)};
    left: ${({ theme }) => theme.spacing(3)};
  }
`;

const TestimonialContent = styled.div`
  margin-left: ${({ theme }) => theme.spacing(10)};
  
  @media (max-width: 480px) {
    margin-left: ${({ theme }) => theme.spacing(8)};
  }
`;

const TestimonialText = styled.blockquote`
  font-size: ${({ theme }) => theme.fontSize.xl};
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(6)};
  font-style: italic;
  position: relative;
  
  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
  
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSize.base};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
  }
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
`;

const AuthorAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ gradient }) => gradient || 'linear-gradient(135deg, #667eea, #764ba2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: rotate(45deg);
    transition: all 0.6s ease;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
    transform: rotate(45deg) translate(50%, 50%);
  }
  
  @media (max-width: 480px) {
    width: 60px;
    height: 60px;
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.lg};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing(0.5)};
  
  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fontSize.base};
  }
`;

const AuthorRole = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(0.5)};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StarIcon = styled.div`
  color: ${({ filled, theme }) => 
    filled ? theme.colors.warning : theme.colors.border};
  font-size: ${({ theme }) => theme.fontSize.sm};
  transition: all ${({ theme }) => theme.transitions.fast};
`;

const AuthorStats = styled.div`
  display: flex;
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

const CarouselControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(6)};
`;

const CarouselButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fontSize.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const CarouselDots = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(1)};
`;

const CarouselDot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.border};
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    transform: scale(1.2);
  }
`;

const Testimonials = ({ className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonialsData = [
    {
      id: 1,
      text: "AddisMusic has completely transformed how I discover and enjoy music. The personalized recommendations are spot-on, and the sound quality is absolutely phenomenal. It's like having a personal DJ who knows exactly what I want to hear!",
      author: "Sarah Johnson",
      role: "Music Producer",
      avatar: null,
      gradient: "linear-gradient(135deg, #667eea, #764ba2)",
      rating: 5,
      tracksPlayed: "2.4K",
      playlists: "147"
    },
    {
      id: 2,
      text: "As a musician, I need a platform that understands the nuances of different genres. AddisMusic's curated collections and discovery features have introduced me to artists I would never have found otherwise. It's an essential tool for my creative process.",
      author: "Marcus Chen",
      role: "Indie Artist",
      avatar: null,
      gradient: "linear-gradient(135deg, #ff9d6c, #bb4e75)",
      rating: 5,
      tracksPlayed: "5.1K",
      playlists: "89"
    },
    {
      id: 3,
      text: "The seamless integration across all my devices and the intuitive interface make AddisMusic my go-to music platform. Whether I'm commuting, working out, or just relaxing at home, it delivers the perfect soundtrack for every moment.",
      author: "Emily Rodriguez",
      role: "UX Designer",
      avatar: null,
      gradient: "linear-gradient(135deg, #a8edea, #fed6e3)",
      rating: 5,
      tracksPlayed: "3.7K",
      playlists: "203"
    },
    {
      id: 4,
      text: "What sets AddisMusic apart is its commitment to supporting emerging artists while maintaining an incredible catalog of classics. The platform feels like it truly cares about music as an art form, not just entertainment.",
      author: "David Thompson",
      role: "Music Journalist",
      avatar: null,
      gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
      rating: 5,
      tracksPlayed: "6.8K",
      playlists: "76"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentIndex]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon key={index} filled={index < rating}>
        <FiStar fill={index < rating ? "currentColor" : "none"} />
      </StarIcon>
    ));
  };

  return (
    <TestimonialsSection 
      className={className}
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <Container>
        <SectionHeader>
          <SectionTitle>What Our Users Say</SectionTitle>
          <SectionSubtitle>
            Join thousands of music lovers who've made AddisMusic their daily soundtrack
          </SectionSubtitle>
        </SectionHeader>

        <TestimonialCarousel>
          <TestimonialTrack currentIndex={currentIndex}>
            {testimonialsData.map((testimonial) => (
              <TestimonialSlide key={testimonial.id}>
                <TestimonialCard>
                <QuoteIcon>
                  <FiMessageCircle />
                </QuoteIcon>                  <TestimonialContent>
                    <TestimonialText>
                      "{testimonial.text}"
                    </TestimonialText>
                    
                    <TestimonialAuthor>
                      <AuthorAvatar gradient={testimonial.gradient}>
                        {testimonial.avatar || testimonial.author.charAt(0)}
                      </AuthorAvatar>
                      
                      <AuthorInfo>
                        <AuthorName>{testimonial.author}</AuthorName>
                        <AuthorRole>{testimonial.role}</AuthorRole>
                        <Rating>
                          {renderStars(testimonial.rating)}
                        </Rating>
                        <AuthorStats>
                          <StatItem>
                            <FiPlay />
                            {testimonial.tracksPlayed} tracks
                          </StatItem>
                          <StatItem>
                            <FiHeart />
                            {testimonial.playlists} playlists
                          </StatItem>
                        </AuthorStats>
                      </AuthorInfo>
                    </TestimonialAuthor>
                  </TestimonialContent>
                </TestimonialCard>
              </TestimonialSlide>
            ))}
          </TestimonialTrack>
        </TestimonialCarousel>

        <CarouselControls>
          <CarouselButton onClick={prevSlide}>
            <FiChevronLeft />
          </CarouselButton>
          
          <CarouselDots>
            {testimonialsData.map((_, index) => (
              <CarouselDot
                key={index}
                isActive={index === currentIndex}
                onClick={() => goToSlide(index)}
              />
            ))}
          </CarouselDots>
          
          <CarouselButton onClick={nextSlide}>
            <FiChevronRight />
          </CarouselButton>
        </CarouselControls>
      </Container>
    </TestimonialsSection>
  );
};

export default Testimonials;
