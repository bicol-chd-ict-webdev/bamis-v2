import { Context, createContext, JSX, ReactNode, useContext, useState } from 'react';

interface SearchContextProps {
    search: string;
    setSearch: (v: string) => void;
}

const SearchContext: Context<SearchContextProps | null> = createContext<SearchContextProps | null>(null);

export const useSearchContext = (): SearchContextProps => {
    const context: SearchContextProps | null = useContext(SearchContext);
    if (!context) throw new Error('useSearchContext must be used inside SearchProvider!');
    return context;
};

export function SearchProvider({ children }: { children: ReactNode }): JSX.Element {
    const [search, setSearch] = useState('');

    return <SearchContext.Provider value={{ search, setSearch }}>{children}</SearchContext.Provider>;
}
