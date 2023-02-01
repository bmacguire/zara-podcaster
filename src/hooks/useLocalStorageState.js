import { useState, useEffect } from "react";

// Works like useState but it saves the state to localStorage
export default function useLocalStorageState(key, initialValue) {
    // Use an app key to avoid conflicts in the localStorage
    const appKey = `zara-podcaster-${key}`;
    
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(appKey);

        if (item !== null) {
            return JSON.parse(item);
        }

        return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(appKey, JSON.stringify(value));
    }, [appKey, value]);

    return [value, setValue];
}