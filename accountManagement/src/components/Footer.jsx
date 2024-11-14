import React from 'react';

const Footer = ({ darkTheme }) => {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: darkTheme ? 'var(--background-color-dark, #121212)' : 'var(--background-color-light, #f0f0f0)',
        color: darkTheme ? 'var(--text-color-dark, #ffffff)' : 'var(--text-color-light, #000000)',
      }}
    >
      <p style={{ margin: 0 }}>
        Made by{' '}
        <a
          href="https://piyushbhagchandani.me"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: darkTheme ? '#fdda0d' : '#007bff', textDecoration: 'none' }}
        >
          Piyush Bhagchandani
        </a>
      </p>
      <p style={{ margin: 0 }}>
        <a
          href="https://github.com/piyushbhagchandani"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: darkTheme ? '#fdda0d' : '#007bff', textDecoration: 'none' }}
        >
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
