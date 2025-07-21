import React from 'react';
import { Global, css, useTheme } from '@emotion/react';

const GlobalStyles = () => {
  const theme = useTheme();
  
  return (
    <Global
      styles={css`
        /* Reset and base styles */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html {
          font-size: 16px;
          scroll-behavior: smooth;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 
                       'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          font-weight: ${theme.fontWeight.normal};
          line-height: 1.6;
          color: ${theme.colors.text.primary};
          background: ${theme.colors.background};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          min-height: 100vh;
          transition: all ${theme.transitions.normal};
        }

        /* Import Inter font */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

        /* Focus styles */
        *:focus {
          outline: 2px solid ${theme.colors.primary};
          outline-offset: 2px;
        }

        /* Button reset */
        button {
          font-family: inherit;
          cursor: pointer;
          border: none;
          background: none;
          outline: none;
        }

        /* Input reset */
        input,
        textarea,
        select {
          font-family: inherit;
          border: none;
          outline: none;
          background: transparent;
        }

        /* List reset */
        ul,
        ol {
          list-style: none;
        }

        /* Link reset */
        a {
          text-decoration: none;
          color: inherit;
        }

        /* Heading styles */
        h1, h2, h3, h4, h5, h6 {
          font-weight: ${theme.fontWeight.semibold};
          line-height: 1.2;
          margin-bottom: ${theme.spacing(1)};
          color: ${theme.colors.text.primary};
        }

        h1 { font-size: ${theme.fontSize['3xl']}; }
        h2 { font-size: ${theme.fontSize['2xl']}; }
        h3 { font-size: ${theme.fontSize.xl}; }
        h4 { font-size: ${theme.fontSize.lg}; }
        h5 { font-size: ${theme.fontSize.base}; }
        h6 { font-size: ${theme.fontSize.sm}; }

        /* Paragraph styles */
        p {
          margin-bottom: ${theme.spacing(2)};
          color: ${theme.colors.text.primary};
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: ${theme.colors.border};
        }

        ::-webkit-scrollbar-thumb {
          background: ${theme.colors.text.light};
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.colors.text.secondary};
        }

        /* React Toastify custom styles */
        .Toastify__toast-container {
          font-family: 'Inter', sans-serif;
        }

        .Toastify__toast {
          border-radius: ${theme.borderRadius.md};
          box-shadow: ${theme.shadows.lg};
          font-size: ${theme.fontSize.sm};
          min-height: auto;
          padding: ${theme.spacing(2)};
          background: ${theme.colors.surface};
          color: ${theme.colors.text.primary};
        }

        .Toastify__toast--success {
          background: ${theme.colors.success};
          color: white;
        }

        .Toastify__toast--error {
          background: ${theme.colors.error};
          color: white;
        }

        .Toastify__toast--warning {
          background: ${theme.colors.warning};
          color: white;
        }

        .Toastify__progress-bar {
          background: rgba(255, 255, 255, 0.7);
        }

        .Toastify__close-button {
          color: currentColor;
          opacity: 0.7;
        }

        .Toastify__close-button:hover {
          opacity: 1;
        }
      `}
    />
  );
};

export default GlobalStyles;
