import React, { useState } from "react";
import "./PurchaseModal.css"; // Import the CSS file

const PurchaseModal = ({ sweet, onClose }) => {
  const [quantity, setQuantity] = useState(1);

  const handlePurchase = () => {
    const token = localStorage.getItem("token");

    fetch(
      `http://localhost:8081/api/sweets/${sweet.id}/purchase?quantity=${quantity}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Purchase successful!");
        onClose();
      })
      .catch((err) => console.error("Error purchasing:", err));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Purchase {sweet.name}</h2>
        <p className="modal-info">
          Available stock:{" "}
          <span className="modal-info-stock">{sweet.quantityStock}</span>
        </p>
        <div className="input-group">
          <label htmlFor="quantity" className="input-label">
            Quantity:
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            max={sweet.quantityStock}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="quantity-input"
          />
        </div>
        <div className="button-container">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="buy-button" onClick={handlePurchase}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
