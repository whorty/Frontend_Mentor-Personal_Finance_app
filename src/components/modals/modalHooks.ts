import { useEffect, type RefObject } from "react";

// Close modal when clicking the overlay background
export function handleOverlayClick(e: React.MouseEvent, onClose: () => void) {
  if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
    onClose();
  }
}

// Hook: close modal when user presses Escape
export function useEscapeClose(onClose: () => void) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);
}

// Hook: close when clicking outside a referenced element
export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  onClose: () => void
) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onClose]);
}
