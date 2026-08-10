"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type SearchContextType = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const SearchContext =
  createContext<SearchContextType | null>(null);

export function SearchProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <SearchContext.Provider
      value={{
        open,
        setOpen,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearch must be used inside SearchProvider"
    );
  }

  return context;
}