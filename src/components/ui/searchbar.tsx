"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  debounceMs?: number;
}

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, placeholder = "Search for services", onChange, onSearch, debounceMs = 300, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState("");
    const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

    // Sync internal state with external value if provided (for controlled usage)
    React.useEffect(() => {
      if (props.value !== undefined) {
        setInputValue(String(props.value));
      }
    }, [props.value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);

      // 1. Call standard onChange (crucial for React Hook Form / register)
      if (onChange) {
        onChange(e);
      }

      // 2. Handle debounced onSearch callback
      if (onSearch) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          onSearch(newValue);
        }, debounceMs);
      }
    };

    // Cleanup timeout on unmount
    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    return (
      <div className={cn("relative flex items-center w-full", className)}>
        <div className="absolute left-4 flex items-center pointer-events-none">
          <Search className="size-6 text-primary-text" strokeWidth={1.5} />
        </div>
        <input
          ref={ref}
          type="text"
          className={cn(
            "w-full h-14 pl-12 pr-4 bg-[#F3E8E8] text-primary-text placeholder:text-primary-text/60 rounded-xl border-none outline-none focus:ring-0 text-lg transition-all",
            "dark:bg-[#2A1D1D] dark:text-[#E8D9D9] dark:placeholder:text-[#E8D9D9]/60"
          )}
          placeholder={placeholder}
          onChange={handleChange}
          value={props.value !== undefined ? props.value : inputValue}
          {...props}
        />
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export { SearchBar };