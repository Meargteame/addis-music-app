const createTheme = (mode = 'light') => ({
  mode,
  colors: {
    primary: mode === 'light' ? '#6366f1' : '#8b5cf6',
    primaryDark: mode === 'light' ? '#4f46e5' : '#7c3aed',
    secondary: mode === 'light' ? '#f59e0b' : '#fbbf24',
    accent: mode === 'light' ? '#ec4899' : '#f472b6',
    background: mode === 'light' ? '#f8fafc' : '#0f172a',
    backgroundSecondary: mode === 'light' ? '#f1f5f9' : '#1e293b',
    surface: mode === 'light' ? '#ffffff' : '#1e293b',
    surfaceSecondary: mode === 'light' ? '#f8fafc' : '#334155',
    text: {
      primary: mode === 'light' ? '#1e293b' : '#f1f5f9',
      secondary: mode === 'light' ? '#64748b' : '#94a3b8',
      light: mode === 'light' ? '#94a3b8' : '#64748b',
      dark: mode === 'light' ? '#f1f5f9' : '#1e293b'
    },
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    border: mode === 'light' ? '#e2e8f0' : '#334155',
    borderDark: mode === 'light' ? '#334155' : '#475569',
    shadow: mode === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.3)',
    shadowDark: mode === 'light' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.6)',
    // Music-specific gradients
    gradients: {
      hero: mode === 'light' 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'linear-gradient(135deg, #2d1b69 0%, #11172b 100%)',
      card: mode === 'light'
        ? 'linear-gradient(135deg, #ff9d6c 0%, #bb4e75 100%)'
        : 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
      album: [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #ff9d6c 0%, #bb4e75 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      ]
    }
  },
  spacing: (factor) => `${factor * 8}px`,
  borderRadius: {
    sm: '6px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px'
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem'
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800
  },
  shadows: {
    sm: mode === 'light' 
      ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      : '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    md: mode === 'light'
      ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      : '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
    lg: mode === 'light'
      ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      : '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
    xl: mode === 'light'
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      : '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
    glow: mode === 'light'
      ? '0 0 20px rgba(99, 102, 241, 0.3)'
      : '0 0 30px rgba(139, 92, 246, 0.5)'
  },
  transitions: {
    fast: '150ms ease-in-out',
    normal: '250ms ease-in-out',
    slow: '350ms ease-in-out'
  }
});

// Default light theme
const theme = createTheme('light');

export { createTheme };
export default theme;
