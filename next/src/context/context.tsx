'use client';

import { createContext, useState } from 'react';

export interface IContext {
    api?: {
        host: string;
        name: string;
        description: string;
        version: string;
    };
    apps?: string[];
    endpoints?: { [key: string]: any };
}

interface ContextType {
    context: IContext;
    setContext: React.Dispatch<React.SetStateAction<IContext>>;
}

export const Context = createContext<ContextType>({
    context: {},
    setContext: () => {},
});

const ContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [context, setContext] = useState<IContext>({});
    return (
        <Context.Provider value={{ context, setContext }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
