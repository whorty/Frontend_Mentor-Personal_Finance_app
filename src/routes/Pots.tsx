import "../components/Pots/PotsCards.css";
import PotsCards from "../components/Pots/PotsCards";
import { DataContext, type Total } from "../utils/DataContext";
import { useContext, useMemo } from "react";
import { ModalPot } from "../components/modals/modal";
import { addPot, deletePot, updatePot } from "../utils/db";
import { useModal } from "../components/modals/useModal";

export default function Pots() {
  const { potsData, setPotsData } = useContext(DataContext);
  const {
    mode,
    selected: selectedPot,
    isOpen,
    openAdd,
    openEdit,
    openDelete,
    close,
  } = useModal<Total>();
  const initialData = useMemo(() => {
    if (!selectedPot) return undefined;
    return {
      name: selectedPot.name,
      target: selectedPot.target,
      theme: selectedPot.theme,
    };
  }, [selectedPot]);
  return (
    <section id="Pots">
      {isOpen && (
        <ModalPot
          isOpen={true}
          title={mode == "Delete" ? "‘" + selectedPot!.name + "’?" : "Pot"}
          mode={mode!}
          initialData={mode === "Edit" && selectedPot ? initialData : undefined}
          onClose={close}
          onSubmit={async (data) => {
            if (mode === "Add") {
              const result = await addPot(data);
              if (result && setPotsData)
                setPotsData((prev) => [...prev, ...result]);
            }

            if (mode === "Edit" && selectedPot) {
              const result = await updatePot(selectedPot.id, data);
              if (result && setPotsData)
                setPotsData((prev) =>
                  prev.map((b) =>
                    b.id === selectedPot.id ? { ...b, ...result[0] } : b
                  )
                );
            }

            if (mode === "Delete" && selectedPot && setPotsData) {
              await deletePot(selectedPot.id);
              setPotsData((prev) =>
                prev.filter((b) => b.id !== selectedPot.id)
              );
            }

            close();
          }}
        />
      )}
      <header>
        <h1>Pots</h1>
        <button className="btn bg-black" onClick={openAdd}>
          + Add New Pot
        </button>
      </header>
      <section>
        {potsData.map((pot) => (
          <PotsCards
            key={pot.id}
            {...pot}
            onEdit={() => openEdit(pot)}
            onDelete={() => openDelete(pot)}
          />
        ))}
      </section>
    </section>
  );
}
