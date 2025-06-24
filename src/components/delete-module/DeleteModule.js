import React from "react";
import "./DeleteModule.scss";

const DeleteModule = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal__overlay">
      <div className="modal">
        <h2 className="modal__title">
          Rostdan ham ushbu mahsulotni o‘chirmoqchimisiz?
        </h2>
        <div className="modal__actions">
          <button onClick={onConfirm} className="confirm__btn">
            Ha, o‘chir
          </button>
          <button onClick={onCancel} className="cancel__btn">
            Yo‘q, bekor
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModule;
