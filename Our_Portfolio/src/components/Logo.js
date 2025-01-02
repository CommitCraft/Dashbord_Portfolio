import React from 'react';

const Logo = () => {
  return (
    <div style={styles.logoContainer}>
      <h1 style={styles.fullName} className="full-name">
        Vipin Kushwaha
      </h1>
      <h1 style={styles.initials} className="initials">
        VK
      </h1>
    </div>
  );
};

const styles = {
  logoContainer: {
    textAlign: 'center',
    padding: '20px',
  },
  fullName: {
    fontFamily: "'vivaldi', serif",
    color: '#ff4500', // Orange color
    fontSize: '3vw', // Responsive font size for full name
    margin: '0',
    display: 'block',
  },
  initials: {
    fontFamily: "'Dancing Script', cursive",
    color: '#ff4500', // Orange color
    fontSize: '20vw', // Responsive font size for initials
    margin: '0',
    display: 'none',
  }
};

export default Logo;