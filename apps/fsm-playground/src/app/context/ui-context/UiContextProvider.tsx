import React, { useState } from 'react';
import { UiContext } from './UiContext';

interface UiContextProviderProps {
  children: React.ReactNode;
}

export const UiContextProvider: React.FC<UiContextProviderProps> = ({
  children,
}) => {
  const [isToastDisplayed, setIsToastDisplayed] = useState<boolean>(false);
  return (
    <UiContext.Provider value={{ isToastDisplayed, setIsToastDisplayed }}>
      {children}
    </UiContext.Provider>
  );
};
