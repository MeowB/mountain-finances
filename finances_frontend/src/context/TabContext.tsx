import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create the context with a default value of undefined
const TabContext = createContext<{
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
} | undefined>(undefined);

// Custom hook to access the context
export const useTab = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
};

// Provider component to wrap your app and share the active tab state
export const TabProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0); // Initial active tab index

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabContext.Provider>
  );
};
