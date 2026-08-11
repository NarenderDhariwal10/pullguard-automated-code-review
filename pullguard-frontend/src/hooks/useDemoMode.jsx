import { createContext, useContext } from 'react';

const DemoContext = createContext({ isDemo: false });

export const DemoProvider = ({ children, isDemo = false }) => (
  <DemoContext.Provider value={{ isDemo }}>{children}</DemoContext.Provider>
);

export const useDemoMode = () => useContext(DemoContext);

export const demoUser = {
  username: 'Demo User',
  avatarUrl: null
};
