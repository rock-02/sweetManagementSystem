import React, { useState, useEffect } from "react";
import axios from "axios";
import PurchaseModal from "./PurchaseModal";
import "./Dashboard.css"; // Don't forget to import the CSS file

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [filters, setFilters] = useState({ name: "", price: "", category: "" });
  const [selectedSweet, setSelectedSweet] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/sweets/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setSweets(res.data);
        setFilteredSweets(res.data);
      })
      .catch((err) => console.error("Error fetching sweets:", err));
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
              className="logout-button"
              onClick={() => {
                localStorage.removeItem("token");

                localStorage.removeItem("role");
                window.location.reload();
                window.location.href = "/login";
              }}
            >
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
              </div>
            ))
          ) : (
            <p className="no-sweets-found">No sweets found</p>
          )}
        </div>
      </main>

      {/* Purchase Modal */}
      {selectedSweet && (
        <PurchaseModal
          sweet={selectedSweet}
          onClose={() => setSelectedSweet(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
