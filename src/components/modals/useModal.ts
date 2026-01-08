import { useState, useCallback } from "react";

export type ModalMode = "Add" | "Edit" | "Delete" | null;

export function useModal<T>() {
  const [mode, setMode] = useState<ModalMode>(null);
  const [selected, setSelected] = useState<T | null>(null);

  const openAdd = useCallback(() => {
    setSelected(null);
    setMode("Add");
  }, []);

  const openEdit = useCallback((item: T) => {
    setSelected(item);
    setMode("Edit");
  }, []);

  const openDelete = useCallback((item: T) => {
    setSelected(item);
    setMode("Delete");
  }, []);

  const close = useCallback(() => {
    setMode(null);
    setSelected(null);
  }, []);

  return {
    mode,
    selected,
    isOpen: mode !== null,
    openAdd,
    openEdit,
    openDelete,
    close,
  };
}
