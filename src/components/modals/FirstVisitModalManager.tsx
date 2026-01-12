import { useEffect, useState } from "react";
import FirstVisitModal from "./FirstVisitModal";

const FirstVisitModalManager = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const visited = localStorage.getItem("hasVisited");
    if (!visited) {
      setIsOpen(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  const handleClose = () => setIsOpen(false);

  return <FirstVisitModal isOpen={isOpen} onClose={handleClose} />;
};

export default FirstVisitModalManager;
