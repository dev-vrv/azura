import { createContext, useState } from "react";

export interface INotification {
    id: number;
    duration: number;
    type: string;
    seen: boolean;
    message?: string;
    createdAt?: Date;
}

export interface IAppContext {
    notifications: INotification[];
    setNotifications: (notifications: INotification[]) => void;
}

export const AppContext = createContext<IAppContext>({
    notifications: [],
    setNotifications: () => {},
  });

export function AppContextProvider({ children }: { children: React.ReactNode }) {
	
    const [notifications, setNotifications] = useState<INotification[]>([]);


    return (
        <AppContext.Provider value={{ notifications, setNotifications }}>
            {children}
        </AppContext.Provider>
    );
}