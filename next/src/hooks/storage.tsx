import { useState } from 'react';

const useSaveStorageItem = (key: string) => {
    const [value, setValue] = useState<string | null>(null);

    const saveItem = (item: string) => {
        localStorage.setItem(key, item);
        setValue(item);
    };

    return [value, saveItem] as const;
};

const useGetStorageItem = (key: string) => {
    const [value, setValue] = useState<string | null>(localStorage.getItem(key));

    const getItem = () => {
        const item = localStorage.getItem(key);
        setValue(item);
    };

    return [value, getItem] as const;
};

export { useSaveStorageItem, useGetStorageItem };