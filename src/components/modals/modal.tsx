import React, { useEffect, useState } from "react";
import "./modal.css";
import {
  Input_Select,
  Input_Select_Themes,
  Input_Text,
} from "../Inputs/Search_Input";
import { PiSortAscendingFill } from "react-icons/pi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { colors } from "../../utils/themes";
import { handleOverlayClick, useEscapeClose } from "./modalHooks";
import { LiaDollarSignSolid } from "react-icons/lia";

interface Name {
  theme: string;
}
interface BudgetForm extends Name {
  category: string;
  maximum: number;
}
interface PotsForm extends Name {
  target: number;
  name: string;
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  mode?: "Add" | "Edit" | "Delete";
  // paragraph?: string;
  onSubmit?: (data: BudgetForm) => void;
  categories?: string[];
  themes?: string[];
  initialData?: BudgetForm;
};

type ModalGeneric = Omit<ModalProps, "initialData" | "onSubmit" | "categories">;
interface ModalPot extends ModalGeneric {
  initialData?: PotsForm;
  onSubmit?: (data: PotsForm) => void;
}

function Modal({
  isOpen,
  onClose,
  title,
  mode = "Add",
  categories,
  initialData,
  onSubmit,
}: ModalProps) {
  const [category, setCategory] = useState("");
  const [maximum, setMaximum] = useState<number>(0);
  const [theme, setTheme] = useState("");
  console.log("Modal render", {
    isOpen,
    mode,
    category,
    maximum,
    theme,
  });
  // console.count("renders");
  useEscapeClose(onClose);

  const paragraph = {
    Add: "Choose a category to set a spending budget. These categories can help you monitor spending.",
    Edit: "As your budgets change, feel free to update your spending limits.",
    Delete:
      "Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.",
  };
  // ✅ Sync state when modal opens or data changes
  useEffect(() => {
    if (!isOpen) return;

    if (mode === "Edit" && initialData) {
      setCategory(initialData.category);
      setMaximum(initialData.maximum);
      setTheme(initialData.theme);
    }
    if (mode === "Add") {
      setCategory("");
      setMaximum(0);
      setTheme(colors[0]?.colorCode ?? "");
    }
  }, [isOpen, mode, initialData]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === "Delete") {
      onSubmit?.({ category, maximum, theme });
      onClose();
      return;
    }

    if (!category) return alert("Please select a category");
    if (maximum <= 0) return alert("Maximum spend must be greater than 0");
    if (!theme) return alert("Please select a theme");

    onSubmit?.({ category, maximum, theme });
    onClose();
  }
  if (!isOpen) return null;
  return (
    <div
      className="modal-overlay"
      onClick={(e) => handleOverlayClick(e, onClose)}
    >
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

        {mode !== "Delete" && (
          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor={`Select-${title}`}>{`${title} Category`}</label>
            <Input_Select
              options={categories}
              title={title}
              mode="Edit"
              value={initialData?.category}
              onChange={(v) => setCategory(v)}
            >
              <PiSortAscendingFill />
            </Input_Select>

            <label htmlFor={`MaximumSpend-${title}`}>
              {title == "Budget" ? "Maximum Spend" : "Target"}
            </label>
            <div className="input-layout">
              <div className="input-custom">
                <input
                  type="number"
                  id={`MaximumSpend-${title}`}
                  name="maximum-spend"
                  value={mode == "Add" ? undefined : maximum}
                  placeholder="0"
                  onChange={(e) => setMaximum(Number(e.target.value))}
                  min={0}
                />
              </div>
            </div>
            <label htmlFor="select-colorPicker">Theme</label>
            <Input_Select_Themes
              colors={colors}
              onChange={(v) => setTheme(v)}
              colorPicker={true}
              value={initialData?.theme ?? theme}
            >
              <PiSortAscendingFill />
            </Input_Select_Themes>

            <div className="modal-actions">
              <button type="submit" className="btn bg-black">
                {mode == "Add" ? `${mode + " " + title}` : "Save Changes"}
              </button>
            </div>
          </form>
        )}
        {mode === "Delete" && (
          <form id="delete-entry" onSubmit={handleSubmit}>
            <div className="modal-actions">
              <button className="btn bg-red">Yes, Confirm Deletion</button>
              <button
                className="btn grey"
                aria-label="Close-button"
                onClick={onClose}
              >
                No, Go Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default React.memo(Modal);

export function ModalPot({
  isOpen,
  onClose,
  title,
  mode = "Add",
  initialData,
  onSubmit,
}: ModalPot) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState(0);
  const [theme, setTheme] = useState("");

  useEscapeClose(onClose);
  // console.count("render:");

  const paragraph = {
    Add: "Create a pot to set savings targets. These can help keep you on track as you save for special purchases.",
    Edit: "If your saving targets change, feel free to update your pots.",
    Delete:
      "Are you sure you want to delete this pot? This action cannot be reversed, and all the data inside it will be removed forever.",
  };

  // ✅ Sync state on open / data change
  useEffect(() => {
    if (!isOpen) return;

    if (mode === "Edit" && initialData) {
      setName(initialData.name);
      setTarget(initialData.target);
      setTheme(initialData.theme);
    }

    if (mode === "Add") {
      setName("");
      setTarget(0);
      setTheme(colors[0]?.colorCode ?? "");
    }
  }, [isOpen, mode, initialData]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (mode === "Delete") {
      onSubmit?.({ name, target, theme });
      onClose();
      return;
    }

    if (!name.trim()) return alert("Please enter a pot name");
    if (target <= 0) return alert("Target must be greater than 0");
    if (!theme) return alert("Please select a theme");

    onSubmit?.({ name, target, theme });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => handleOverlayClick(e, onClose)}
    >
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

        {mode !== "Delete" && (
          <form className="modal-form" onSubmit={handleSubmit}>
            <label htmlFor={`Pot-text_input-${name + "" + mode}`}>
              Pot Name
            </label>
            <div className="input-default input-layout">
              <Input_Text
                type="text"
                name={`Pot-text_input-${name + "" + mode}`}
                value={name}
                placeholder="e.g. Rainy Days"
                maxlength={30}
                validationWarning={true}
                onChange={(e) => setName(String(e.target.value))}
              />
            </div>
            <label htmlFor={`target-${title + mode}`}>
              {title == "Budget" ? "Maximum Spend" : "Target"}
            </label>
            <div className="input-layout">
              <div className="input-custom">
                <input
                  type="number"
                  id={`target-${title + mode}`}
                  name="target"
                  value={mode == "Add" ? undefined : target}
                  placeholder="e.g. 2000"
                  onChange={(e) => setTarget(Number(e.target.value))}
                  min={0}
                />
                <LiaDollarSignSolid />
              </div>
            </div>
            <label htmlFor="select-colorPicker">Theme</label>
            <Input_Select_Themes
              colors={colors}
              onChange={(v) => setTheme(v)}
              colorPicker={true}
              value={initialData?.theme ?? theme}
            >
              <PiSortAscendingFill />
            </Input_Select_Themes>

            <div className="modal-actions">
              <button type="submit" className="btn bg-black">
                {mode == "Add" ? `${mode + " " + title}` : "Save Changes"}
              </button>
            </div>
          </form>
        )}
        {mode === "Delete" && (
          <form id="delete-entry" onSubmit={handleSubmit}>
            <div className="modal-actions">
              <button className="btn bg-red">Yes, Confirm Deletion</button>
              <button
                className="btn grey"
                aria-label="Close-button"
                onClick={onClose}
              >
                No, Go Back
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
