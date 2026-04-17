import { useState } from "react";
import "./UserProfile.css";
import userImage from "./assets/user-icon.png";

export default function UserProfile() {
  // ================= STATE =================
  const [userProfile, setUserProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    address: {
      street: "123 Main St",
      city: "Tacoma",
      country: "USA",
    },
  });

  const [form, setForm] = useState({
    name: "",
    email: "",
    street: "",
    city: "",
    country: "",
  });

  // ================= HANDLERS =================
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateName = () => {
    setUserProfile((prev) => ({
      ...prev,
      name: form.name || prev.name,
    }));

    setForm((prev) => ({ ...prev, name: "" }));
  };

  const updateEmail = () => {
    setUserProfile((prev) => ({
      ...prev,
      email: form.email || prev.email,
    }));

    setForm((prev) => ({ ...prev, email: "" }));
  };

  const updateAddress = () => {
    setUserProfile((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        street: form.street || prev.address.street,
        city: form.city || prev.address.city,
        country: form.country || prev.address.country,
      },
    }));

    setForm((prev) => ({
      ...prev,
      street: "",
      city: "",
      country: "",
    }));
  };

  return (
    <div className="profile-container">
      {/* LEFT PANEL */}
      <div className="card">
        <h2 className="title">User Profile</h2>

        {/* NAME */}
        <div className="section">
          <h4>Name</h4>
          <input
            className="input"
            placeholder="Enter name"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <button className="button" onClick={updateName}>
            Update
          </button>
        </div>

        {/* EMAIL */}
        <div className="section">
          <h4>Email</h4>
          <input
            className="input"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <button className="button" onClick={updateEmail}>
            Update
          </button>
        </div>

        {/* ADDRESS */}
        <div className="section">
          <h4>Address</h4>

          <input
            className="input"
            placeholder="Street"
            value={form.street}
            onChange={(e) => handleChange("street", e.target.value)}
          />

          <input
            className="input"
            placeholder="City"
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />

          <input
            className="input"
            placeholder="Country"
            value={form.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />

          <button className="button" onClick={updateAddress}>
            Update Address
          </button>
        </div>

        {/* DISPLAY */}
        <div className="display">
          <h4>Current Profile</h4>

          <p>
            <b>Name:</b> {userProfile.name}
          </p>
          <p>
            <b>Email:</b> {userProfile.email}
          </p>
          <p>
            <b>Street:</b> {userProfile.address.street}
          </p>
          <p>
            <b>City:</b> {userProfile.address.city}
          </p>
          <p>
            <b>Country:</b> {userProfile.address.country}
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="avatar">
        <img
          src={userImage}
          alt="User"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "12px",
          }}
        />
      </div>
    </div>
  );
}
