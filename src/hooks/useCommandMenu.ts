import { useState, KeyboardEvent, useCallback } from 'react';

const useCommandMenu = (): [
  boolean,
  (isOpen: boolean) => void,
  (event: KeyboardEvent<HTMLDivElement>) => void
] => {
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);

  const checkKeyForMenu = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== '/') {
      setIsCommandMenuOpen(false);
      return;
    }
    setIsCommandMenuOpen(true);
  }, []);

  return [isCommandMenuOpen, setIsCommandMenuOpen, checkKeyForMenu];
};

export default useCommandMenu;
