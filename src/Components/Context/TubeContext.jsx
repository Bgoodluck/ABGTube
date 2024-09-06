import React, { createContext, useState, useEffect } from 'react';

export const TubeContext = createContext();

export const TubeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    // Add additional login logic here if needed
  };

  const updateUserProfile = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('user', JSON.stringify(updatedUserData));
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme);
      document.body.classList.add(storedTheme);
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return (
    <TubeContext.Provider value={{ theme, toggleTheme, user, handleLogin, updateUserProfile }}>
      {children}
    </TubeContext.Provider>
  );
};
