import { useState, useRef, useEffect } from "react";
import "./PopupMenu.css";

export default function PopupMenu({
  icon,
  label,
  onEdit,
  onDelete,
}: {
  icon: string;
  label: string;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // close popup if user clicks outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = () => {
    onEdit?.();
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete?.();
    setOpen(false);
  };

  return (
    <div className="popup-container" ref={menuRef}>
      <button className="popup-button" onClick={() => setOpen(!open)}>
        <img src={icon} alt="elipsis icons for options" />
      </button>

      {open && (
        <div className="popup-menu">
          <button className="popup-item" onClick={handleEdit}>
            Edit {label}
          </button>
          <button className="popup-item delete" onClick={handleDelete}>
            Delete {label}
          </button>
        </div>
      )}
    </div>
  );
}
