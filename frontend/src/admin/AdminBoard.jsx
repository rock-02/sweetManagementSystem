import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreateSweetModal from "./CreateSweetModal";
import UpdateSweetModal from "./UpdateSweetModal";
import "../user/DashBoard.css";
import PurchaseModal from "../user/PurchaseModal";

const AdminDashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [filters, setFilters] = useState({ name: "", price: "", category: "" });
  const [selectedSweet, setSelectedSweet] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sweetToUpdate, setSweetToUpdate] = useState(null);

  const navigate = useNavigate();

  const fetchSweets = () => {
    axios
      .get("http://localhost:8081/api/sweets/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSweets(res.data);
      })
      .catch((err) => console.error("Error fetching sweets:", err));
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  useEffect(() => {
    let result = sweets;
    if (filters.name) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    if (filters.price) {
      result = result.filter((s) => s.price <= parseFloat(filters.price));
    }
    if (filters.category) {
      result = result.filter((s) =>
        s.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    setFilteredSweets(result);
  }, [filters, sweets]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleDataChange = () => {
    fetchSweets();
    setIsCreateModalOpen(false);
    setSweetToUpdate(null);
    setSelectedSweet(null);
  };

  const handleDeleteSweet = (sweetId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this sweet?"
    );
    if (isConfirmed) {
      axios
        .delete(`http://localhost:8081/admin/api/sweets/${sweetId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          alert("Sweet deleted successfully!");
          handleDataChange(); // Re-fetch the data to update the UI
        })
        .catch((err) => {
          console.error("Error deleting sweet:", err);
          alert("Failed to delete sweet. Please try again.");
        });
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Sweet Shop Dashboard</h1>
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search by name"
              className="filter-input"
              value={filters.name}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="filter-input"
              value={filters.price}
              onChange={(e) =>
                setFilters({ ...filters, price: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Category"
              className="filter-input"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
            />
            <button
              className="create-button"
              onClick={() => setIsCreateModalOpen(true)}
            >
              Create Sweet
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Sweet Cards */}
      <main className="main-content">
        <div className="sweet-grid">
          {filteredSweets.length > 0 ? (
            filteredSweets.map((sweet) => (
              <div key={sweet.id} className="sweet-card">
                <div className="card-header">
                  <h3 className="card-title">{sweet.name}</h3>
                  <span className="category-tag">{sweet.category}</span>
                </div>
                <p className="sweet-price">₹{sweet.price}</p>
                <p className="sweet-stock">
                  Stock:{" "}
                  <span
                    className={sweet.quantityStock === 0 ? "out-of-stock" : ""}
                  >
                    {sweet.quantityStock}
                  </span>
                </p>
                <button
                  className={`purchase-button ${
                    sweet.quantityStock === 0 ? "disabled" : "available"
                  }`}
                  disabled={sweet.quantityStock === 0}
                  onClick={() => setSelectedSweet(sweet)}
                >
                  Purchase
                </button>
                <button
                  className="update-button"
                  onClick={() => setSweetToUpdate(sweet)}
                >
                  Update
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteSweet(sweet.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p className="no-sweets-found">No sweets found</p>
          )}
        </div>
      </main>

      {/* Modals */}
      {selectedSweet && (
        <PurchaseModal sweet={selectedSweet} onClose={handleDataChange} />
      )}
      {isCreateModalOpen && (
        <CreateSweetModal
          onClose={() => setIsCreateModalOpen(false)}
          onSweetCreated={handleDataChange}
        />
      )}
      {sweetToUpdate && (
        <UpdateSweetModal
          sweet={sweetToUpdate}
          onClose={() => setSweetToUpdate(null)}
          onSweetUpdated={handleDataChange}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
