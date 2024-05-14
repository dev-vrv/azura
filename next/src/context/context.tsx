import { createContext, useContext, useState } from 'react';


export const Context = createContext({

});

export const ContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [state, setState] = useState({});

    return (
        <Context.Provider value={{ state, setState }}>
            {children}
        </Context.Provider>
    );
};