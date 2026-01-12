import React from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./modal.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const FirstVisitModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" style={{ backdropFilter: "blur(3px)" }}>
      <div
        className="modal-container"
        style={{
          backgroundColor: "#201f24",
          color: "white",
        }}
      >
        <div className="modal-header">
          <h1>Welcome!</h1>
          <button className="modal-close" aria-label="Close" onClick={onClose}>
            <IoIosCloseCircleOutline />
          </button>
        </div>
        <h4
          className="modal-paragraph"
          style={{ fontStyle: "italic", color: "white" }}
        >
          Thanks for visiting , Built by me as part of a Frontend Mentor
          challenge, this Personal Finance App showcases some of my frontend
          skills
        </h4>
        <p>
          contact:
          <span>
            {" "}
            <a href="mailto:dariel.moncaleano@outlook.com?subject=Contact%20from%20Portfolio">
              dariel.moncaleano@outlook.com
            </a>
          </span>
        </p>
      </div>
    </div>
  );
};

export default FirstVisitModal;
