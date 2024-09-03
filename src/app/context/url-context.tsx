'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UrlsContextType {
  urls: string[];
  addUrl: (url: string[]) => void;
}

const UrlsContext = createContext<UrlsContextType | undefined>(undefined);

export const UrlsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [urls, setUrls] = useState<string[]>([]);

  const addUrl = (newUrls: string[]) => {
    setUrls(newUrls);
  };

  return (
    <UrlsContext.Provider value={{ urls, addUrl }}>
      {children}
    </UrlsContext.Provider>
  );
};

export const useUrls = (): UrlsContextType => {
  const context = useContext(UrlsContext);
  if (!context) {
    throw new Error('useUrls must be used within a UrlsProvider');
  }
  return context;
};
