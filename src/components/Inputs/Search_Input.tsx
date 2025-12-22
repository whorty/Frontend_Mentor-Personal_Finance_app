import { useState, useRef, useEffect, type ReactNode } from "react";
import { IoIosSearch } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa";
import "./inputs.css";
import type { ColorObject } from "../../utils/themes";
import { FaCircleCheck } from "react-icons/fa6";

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
  label?: string;
  onChange?: (option: string) => void;
  children: ReactNode;
  title?: string;
  options?: string[];
  colorPicker?: boolean;
  colors?: ColorObject[];
  value?: string;
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
      {props.label && <h4 className="desktop">{props.label}</h4>}
      <div className="input-custom popup-container small" ref={menuRef}>
        <input
          type="text"
          name={`Select-${props.title}`}
          id={`Select-${props.title}`}
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

export function Input_Select_Themes(props: CustomInput) {
  // const nameOfColors = props.colors?.map((color) => color.name);
  const optionsToUse = props.colors || [];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(optionsToUse[0].name);
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

  function handleSelect(colorCode: string, colorName: string) {
    setSelected(colorName);
    setOpen(false);
    if (props.onChange) props.onChange(colorCode);
  }

  return (
    <div className="input-layout">
      {props.label && <h4 className="desktop">{props.label}</h4>}
      <div className="input-custom popup-container small" ref={menuRef}>
        <input
          type="text"
          name={`search-colorPicker`}
          id={`select-colorPicker`}
          value={selected}
          readOnly
          onClick={() => setOpen(!open)}
          placeholder={selected}
        />
        <FaCaretDown className="" onClick={() => setOpen(!open)} />
        <div className="mobile" onClick={() => setOpen(!open)}>
          {props.children}
        </div>
        {open && (
          <div
            className={`popup-menu ${
              props.colorPicker == true ? "options-colors" : ""
            }`}
          >
            {optionsToUse.map((option) => (
              <button
                key={option.name}
                className={`popup-item ${
                  option.name == selected ? "selected" : ""
                }`}
                onClick={() => handleSelect(option.colorCode, option.name)}
              >
                {props.colorPicker && (
                  <div
                    className="ball"
                    style={{ backgroundColor: `${option.colorCode}` }}
                  ></div>
                )}
                {option.name}
                {props.colorPicker && <FaCircleCheck />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Input_Text({
  type,
  value,
  name,
  onChange,
  placeholder,
}: {
  type: string;
  value?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}) {
  return (
    <input
      type={type}
      id={name}
      placeholder={placeholder || ""}
      value={value || ""}
      onChange={onChange}
      autoComplete="off"
    />
  );
}
