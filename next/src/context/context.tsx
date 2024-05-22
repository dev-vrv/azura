'use client';

import { createContext, useState, useEffect } from 'react';

export interface IContext {
    [key: string]: {
        [key: string]: any
    }
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
    const [context, setContext] = useState<IContext>({
        api: {
            url: 'http://127.0.0.1:8000/admin/',
            headers: {}
        },
    });

    useEffect(() => {
        console.log("Context updated:", context);
    }, [context]);

    return (
        <Context.Provider value={{ context, setContext }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
