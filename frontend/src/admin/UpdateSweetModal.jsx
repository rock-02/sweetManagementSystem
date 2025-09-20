import React, { useState } from "react";
import "./UpdateSweetModal.css";

const UpdateSweetModal = ({ sweet, onClose, onSweetUpdated }) => {
  const [name, setName] = useState(sweet.name);
  const [price, setPrice] = useState(sweet.price);
  const [category, setCategory] = useState(sweet.category);
  const [quantityStock, setQuantityStock] = useState(sweet.quantityStock);

  const handleUpdate = () => {
    const token = localStorage.getItem("token");
    const updatedSweet = {
      name,
      price: parseFloat(price),
      category,
      quantityStock: parseInt(quantityStock),
    };

    fetch(`http://localhost:8081/admin/api/sweets/${sweet.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSweet),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Sweet updated successfully!");
        onSweetUpdated(data); // Pass the updated sweet back to the Dashboard
        onClose();
      })
      .catch((err) => {
        console.error("Error updating sweet:", err);
        alert("Failed to update sweet. Please try again.");
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Update {sweet.name}</h2>
        <div className="input-group">
          <label htmlFor="name" className="input-label">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="quantity-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="price" className="input-label">
            Price:
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="quantity-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="category" className="input-label">
            Category:
          </label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="quantity-input"
          />
        </div>
        <div className="input-group">
          <label htmlFor="stock" className="input-label">
            Stock:
          </label>
          <input
            id="stock"
            type="number"
            value={quantityStock}
            onChange={(e) => setQuantityStock(e.target.value)}
            className="quantity-input"
          />
        </div>
        <div className="button-container">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button className="buy-button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateSweetModal;
