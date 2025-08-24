import { useEffect, useState } from "react";
import { Theme } from "./theme.enum";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  useEffect(() => {
    setTheme(localStorage.getItem("theme") as Theme);
    document.body.classList.add(theme);
  }, []);
  const toggleTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
    setTheme(newTheme);
  };

  return { theme, toggleTheme };
}
