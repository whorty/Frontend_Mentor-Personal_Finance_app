import { useState, useRef, useEffect, type ReactNode } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import "./inputs.css";

export function Input_Search(props: {
  placeholder: string;
  onChange?: (query: string) => void;
}) {
  return (
    <div className="input-custom" id="Search">
      <input
        type="text"
        name={`search-${props.placeholder}`}
        id={`search-${props.placeholder}`}
        placeholder={`Search ${props.placeholder}`}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
      <IoIosSearch />
    </div>
  );
}

type CustomInput = {
  label: string;
  onChange?: (option: string) => void;
  children: ReactNode;
  options?: string[];
};

const optionsdefault = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];
export function Input_Select(props: CustomInput) {
  const optionsToUse = props.options || optionsdefault;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(optionsToUse[0]);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(opt: string) {
    setSelected(opt);
    setOpen(false);
    if (props.onChange) props.onChange(opt);
  }

  return (
    <div className="input-layout">
      <h4 className="desktop">{props.label}</h4>
      <div className="input-custom popup-container small" ref={menuRef}>
        <input
          type="text"
          name={`search-${props.label}`}
          id={`select-${props.label}`}
          value={selected}
          readOnly
          onClick={() => setOpen(!open)}
          className="desktop"
        />
        <FaCaretDown className="desktop" onClick={() => setOpen(!open)} />
        <div className="mobile" onClick={() => setOpen(!open)}>
          {props.children}
        </div>
        {open && (
          <div className="popup-menu">
            {optionsToUse.map((option) => (
              <button
                key={option}
                className={`popup-item ${option == selected ? "selected" : ""}`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
