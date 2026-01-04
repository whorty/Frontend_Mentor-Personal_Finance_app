import "../components/Pots/PotsCards.css";
import PotsCards from "../components/Pots/PotsCards";
import { DataContext, type Total } from "../utils/DataContext";
import { useContext, useState } from "react";
import { ModalPot } from "../components/modals/modal";
import { addPot, deletePot, updatePot } from "../utils/db";

export default function Pots() {
  const { potsData, setPotsData } = useContext(DataContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedPot, setSelectedPot] = useState<Total | null>(null);
  return (
    <section id="Pots">
      <header>
        <h1>Pots</h1>
        <button className="btn bg-black" onClick={() => setOpenAdd(true)}>
          + Add New Pot
        </button>
        <ModalPot
          isOpen={openAdd}
          onClose={() => setOpenAdd(false)}
          title="Pot"
          mode="Add"
          onSubmit={async (data) => {
            const result = await addPot(data);
            if (result && setPotsData) {
              console.log("Pot added successfully:", result);
              setPotsData([...potsData, ...result]);
            } else {
              console.error("Failed to add Pot", result);
            }
          }}
        />
        <ModalPot
          isOpen={openEdit}
          onClose={() => {
            setOpenEdit(false);
            setSelectedPot(null);
          }}
          title="Pot"
          mode="Edit"
          initialData={
            selectedPot
              ? {
                  name: selectedPot.name,
                  target: selectedPot.target,
                  theme: selectedPot.theme,
                }
              : undefined
          }
          onSubmit={async (data) => {
            if (selectedPot && data.name && data.target > 0 && data.theme) {
              const result = await updatePot(selectedPot.id, {
                name: data.name,
                target: data.target,
                theme: data.theme,
              });
              if (result && setPotsData) {
                console.log("Pot updated successfully:", result);
                setPotsData((prevPots) =>
                  prevPots.map((pot) =>
                    pot.id === selectedPot.id ? { ...pot, ...result[0] } : pot
                  )
                );
              } else {
                console.error("Failed to update Pot");
              }
            } else {
              console.error("Invalid form data: all fields must be filled");
            }
          }}
        />
        <ModalPot
          isOpen={openDelete}
          title={`'${selectedPot?.name || ""}'?`}
          mode="Delete"
          onClose={() => {
            setOpenDelete(false);
            setSelectedPot(null);
          }}
          onSubmit={async () => {
            console.log(selectedPot?.id);
            if (selectedPot) {
              const success = await deletePot(selectedPot.id);
              if (success && setPotsData) {
                console.log("Pot deleted successfully");
                setOpenDelete(false);
                setPotsData((prePotsData) =>
                  prePotsData.filter((pot) => pot.id !== selectedPot.id)
                );
                setSelectedPot(null);
              } else {
                console.error("Failed to delete Pot");
              }
            }
          }}
        />
      </header>
      <section>
        {potsData.map((pot) => (
          <PotsCards
            key={pot.id}
            {...pot}
            onEdit={() => {
              setSelectedPot(pot);
              setOpenEdit(true);
            }}
            onDelete={() => {
              setSelectedPot(pot);
              setOpenDelete(true);
            }}
          />
        ))}
      </section>
    </section>
  );
}
