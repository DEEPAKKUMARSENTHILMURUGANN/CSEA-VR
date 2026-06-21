import { useState, useEffect } from 'react';
import Zone1 from './components/zones/Zone1/Zone1';
import Zone2 from './components/zones/Zone2_StudentInnovationGallery/Zone2';
import './themes/theme1.css';
import './themes/theme2.css';
import './App.css';

function App() {
  const [theme, setTheme] = useState('theme-cyber-dark');
  const [activeZone, setActiveZone] = useState('zone1');

  // Synchronize CSS class with HTML document element
  useEffect(() => {
    const rootElement = document.documentElement;
    rootElement.classList.remove('theme-cyber-dark', 'theme-modern-light');
    rootElement.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => 
      prev === 'theme-cyber-dark' ? 'theme-modern-light' : 'theme-cyber-dark'
    );
  };

  return (
    <div className={`app-container ${theme}`}>
      <header className="app-header">
        <div className="header-brand">
          <span className="brand-logo">🏫</span>
          <span className="brand-name">PSG CSE Experience</span>
        </div>
        
        <nav className="header-nav">
          <button 
            className={`nav-tab ${activeZone === 'zone1' ? 'active' : ''}`}
            onClick={() => setActiveZone('zone1')}
          >
            Zone 1: Highlights
          </button>
          <button 
            className={`nav-tab ${activeZone === 'zone2' ? 'active' : ''}`}
            onClick={() => setActiveZone('zone2')}
          >
            Zone 2: Student Innovation
          </button>
        </nav>
        
        <div className="header-controls">
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            title={theme === 'theme-cyber-dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            {theme === 'theme-cyber-dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="app-main">
        {activeZone === 'zone1' ? (
          <Zone1 onNextZone={() => setActiveZone('zone2')} />
        ) : (
          <Zone2 />
        )}
      </main>
    </div>
  );
}

export default App;
