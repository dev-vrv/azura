'use client';

import { createContext, useState } from 'react';

export interface IContext {
    api?: {
        url: string;
        headers: { [key: string]: string };
        endPoints: { [key: string]: any };
    };
    apps?: { [key: string]: any };
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
			url: "http://127.0.0.1:8000/admin/",
			headers: {},
            endPoints: {}
		},
		apps: {},
	});

    return (
        <Context.Provider value={{ context, setContext }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
