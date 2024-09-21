"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BillsContextType {
  bills: any; // Define a more specific type if you have one
  setBills: (bills: any) => void;
}

const BillsContext = createContext<BillsContextType | undefined>(undefined);

export const BillsProvider = ({ children }: { children: ReactNode }) => {
  const [bills, setBills] = useState<any>(null);

  return (
    <BillsContext.Provider value={{ bills, setBills }}>
      {children}
    </BillsContext.Provider>
  );
};

export const useBills = () => {
  const context = useContext(BillsContext);
  if (!context) {
    throw new Error('useBills must be used within a BillsProvider');
  }
  return context;
};
