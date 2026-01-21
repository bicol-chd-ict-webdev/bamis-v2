import { Context, createContext, JSX, ReactNode, useContext, useEffect, useState } from 'react';

interface LoadingContextType {
    isLoading: boolean;
}

const LoadingContext: Context<LoadingContextType | undefined> = createContext<LoadingContextType | undefined>(undefined);

export const useLoadingContext = (): LoadingContextType => {
    const context: LoadingContextType | undefined = useContext(LoadingContext);
    if (!context) throw new Error('useLoadingContext must be used inside LoadingProvider!');
    return context;
};

export const LoadingProvider = ({ children }: { children: ReactNode }): JSX.Element => {
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    useEffect(() => {
        const timer = setTimeout((): void => setIsInitialLoad(false), 100);
        return () => clearTimeout(timer);
    }, []);

    return <LoadingContext.Provider value={{ isLoading: isInitialLoad }}>{children}</LoadingContext.Provider>;
};
