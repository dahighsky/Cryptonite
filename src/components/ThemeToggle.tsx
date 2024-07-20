"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Theme = "light" | "dark";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const notTheme = () => {
    return theme === "light" ? "dark" : "light";
  };

  return (
    <button onClick={toggleTheme}>
      <Image
        src={`/icons/${notTheme()}-theme-switch.svg`}
        alt={"search"}
        width={24}
        height={24}
      />
    </button>
  );
};

export default ThemeToggle;
