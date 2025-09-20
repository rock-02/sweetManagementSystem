import React, { useState } from "react";
import "./CreateSweetModal.css";

const CreateSweetModal = ({ onClose, onSweetCreated }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantityStock, setQuantityStock] = useState("");

  const handleCreate = () => {
    const token = localStorage.getItem("token");
    const newSweet = {
      name,
      price: parseFloat(price),
      category,
      quantityStock: parseInt(quantityStock),
    };

    fetch("http://localhost:8081/admin/api/sweets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSweet),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        // Check if the response is JSON. If not, handle it as text.
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          return res.text();
        }
      })
      .then((data) => {
        alert("Sweet created successfully!");
        onSweetCreated();
        onClose();
      })
      .catch((err) => {
        console.error("Error creating sweet:", err);
        alert("Failed to create sweet. Please try again.");
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Create New Sweet</h2>
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
          <button className="buy-button" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSweetModal;
