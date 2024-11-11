// context/ThemeContext.tsx
"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { themeDark, themeLight } from "@/theme/theme";
import { Theme, createTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/system";

interface ThemeContextType {
    mode: "dark" | "light";
    setMode: React.Dispatch<React.SetStateAction<boolean>>;
    theme: Theme;
}

const defaultContextValue: ThemeContextType = {
    mode: "light",
    setMode: () => { },
    theme: themeLight,
};

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
    const prefersMode = useMediaQuery("(prefers-color-scheme: dark)");
    const [mode, setMode] = useState<"dark" | "light">("light");

    useEffect(() => {
        setMode(mode);
        console.log(prefersMode);

    }, [mode, setMode]);

    // ایجاد تم جدید با تنظیمات palette
    const theme = createTheme({
        palette: {
            mode: mode, // تنظیم حالت رنگ
        },
        typography: {
            fontFamily: "__fontSahel_7a8a2f",
        },
        direction: "rtl",
    });

    return (
        <ThemeContext.Provider value={{ theme, mode, setMode }}>
            {children}
        </ThemeContext.Provider>
    );
}
