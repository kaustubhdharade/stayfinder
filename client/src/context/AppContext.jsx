import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [appInfo] = useState({
    name: 'StayFinder',
    version: '0.3.0',
    phase: 'Phase 2: PostgreSQL Database Integration & Hotel Discovery APIs',
  });

  const [savedHotelIds, setSavedHotelIds] = useState([]);

  const toggleSaveHotel = (id) => {
    setSavedHotelIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <AppContext.Provider
      value={{
        appInfo,
        savedHotelIds,
        toggleSaveHotel,
        isSaved: (id) => savedHotelIds.includes(id),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
