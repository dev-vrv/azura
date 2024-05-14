"use client";

import Icon from "@/components/icons/Icon";
import { Button } from "react-bootstrap";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
      }, [])
    
      if(!mounted) return null

	return (
		<Button variant="icon" onClick={() => {
            setTheme(theme === "dark" ? "light" : "dark");
        }}>
			<Icon name="dark" size="3" />
		</Button>
	);
}



