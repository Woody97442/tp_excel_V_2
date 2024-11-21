"use client";

import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch"; // composant switch de shadcn
import { MdOutlineNightlight } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";

export default function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialiser l'état avec la valeur du localStorage
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark"; // true si le thème est sombre
  });

  useEffect(() => {
    // Appliquer le thème au chargement du composant
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]); // L'effet dépend de isDarkMode

  return (
    <div className="flex items-center gap-2 justify-end p-4 mx-4">
      <span>
        <MdOutlineLightMode className="h-6 w-6" />
      </span>
      <Switch
        checked={isDarkMode}
        onCheckedChange={setIsDarkMode}
      />
      <span>
        <MdOutlineNightlight className="h-6 w-6" />
      </span>
    </div>
  );
}
