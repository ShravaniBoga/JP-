import { createContext, useContext, useMemo, useState } from "react";

const BrochureModalContext = createContext(null);

export function BrochureModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return (
    <BrochureModalContext.Provider value={value}>
      {children}
    </BrochureModalContext.Provider>
  );
}

export function useBrochureModal() {
  const ctx = useContext(BrochureModalContext);
  if (!ctx) {
    throw new Error("useBrochureModal must be used within a BrochureModalProvider");
  }
  return ctx;
}
