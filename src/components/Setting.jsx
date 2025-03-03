import { useRef } from "react";
import { Sun, Moon, Settings } from "lucide-react";

const Setting = ({ darkMode, setDarkMode }) => {
  const dropdownRef = useRef(null);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-800" />}
      </button>
    </div>
  );
};

export default Setting;
