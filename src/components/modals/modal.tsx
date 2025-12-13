import React, { useState } from "react";
import "./modal.css";
import { Input_Select, Input_Select_Themes } from "../Inputs/Search_Input";
import { PiSortAscendingFill } from "react-icons/pi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { colors } from "../../utils/themes";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  mode?: "Add" | "Edit" | "Delete";
  // paragraph?: string;
  onSubmit?: (data: {
    category: string;
    maximum: number;
    theme: string;
  }) => void;
  categories?: string[];
  themes?: string[];
};

export default function Modal(props: ModalProps) {
  const colorOptions = colors.map((item) => item.name);
  const { isOpen, onClose, title, mode = "Add" } = props;
  const categories = props.categories ?? [];
  const themes = props.themes ?? colorOptions;

  const paragraph = {
    Add: "Choose a category to set a spending budget. These categories can help you monitor spending.",
    Edit: "As your budgets change, feel free to update your spending limits.",
    Delete:
      "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.",
  };

  const [category, setCategory] = useState<string>(categories[0] ?? "");
  const [maximum, setMaximum] = useState<number>(0);
  const [theme, setTheme] = useState<string>(themes[0]);

  function handleOverlayClick(e: React.MouseEvent) {
    // close only if click outside content
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      onClose();
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    props.onSubmit?.({ category, maximum, theme });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-container" role="dialog" aria-modal="true">
        <div className="modal-header">
          <h1>
            {mode == "Add" ? "Add New" : mode} {title}
          </h1>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            <IoIosCloseCircleOutline />
          </button>
        </div>

        {paragraph && (
          <h4 className="modal-paragraph">{paragraph[`${mode}`]}</h4>
        )}

        <form className="modal-form" onSubmit={handleSubmit}>
          <label htmlFor="">{`${title} Category`}</label>
          <Input_Select options={categories} onChange={(v) => setCategory(v)}>
            <PiSortAscendingFill />
          </Input_Select>

          <label htmlFor="">
            {title == "Budget" ? "Maximum Spend" : "Target"}
          </label>
          <div className="input-layout">
            <div className="input-custom">
              <input
                type="number"
                name="maximum-spend"
                value={maximum}
                onChange={(e) => setMaximum(Number(e.target.value))}
                placeholder="0"
                min={0}
              />
            </div>
          </div>
          <label htmlFor="">Theme</label>
          <Input_Select_Themes
            colors={colors}
            onChange={(v) => setTheme(v)}
            colorPicker={true}
          >
            <PiSortAscendingFill />
          </Input_Select_Themes>

          <div className="modal-actions">
            <button type="submit" className="btn bg-black">
              {mode == "Add" ? `${mode + " " + title}` : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
