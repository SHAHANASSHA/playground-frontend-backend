import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

export default function DarkButton() {
 const [theme, setTheme] = useState<"light" | "dark">(() => {
  if (typeof window !== "undefined") {
   return (
    (window.localStorage.getItem("theme") as "light" | "dark") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
     ? "dark"
     : "light")
   );
  }
  return "light";
 });
 const toggleTheme = () => {
  setTheme(theme === "light" ? "dark" : "light");
 };

 useEffect(() => {
  if (typeof window !== "undefined") {
   const root = window.document.documentElement;
   root.classList.remove("light", "dark");
   root.classList.add(theme);
   localStorage.setItem("theme", theme);
  }
 }, [theme]);
 return (
  <div className="fixed top-4 right-4 z-50 shadow-sm bg-background/80 backdrop-blur-sm rounded-full p-1">
   <Button
    variant="ghost"
    size="icon"
    onClick={toggleTheme}
    aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    className="rounded-full"
   >
    {theme === "light" ? (
     <Moon className="h-5 w-5" />
    ) : (
     <Sun className="h-5 w-5" />
    )}
   </Button>
  </div>
 );
}