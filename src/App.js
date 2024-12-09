import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaCog, FaSignOutAlt, FaTachometerAlt, FaSearch } from "react-icons/fa"; // Importing necessary icons
import "./App.css";

function App() {
  const [roles, setRoles] = useState([
    { id: 1, name: "Admin", description: "Full access to all features.", users: 1, type: "Default" },
    { id: 2, name: "Auditor", description: "View-only access to reports.", users: 1, type: "Default" },
    { id: 3, name: "Viewer", description: "Limited access to dashboards.", users: 1, type: "Default" },
  ]);

  const [newRole, setNewRole] = useState({ name: "", description: "", type: "Default" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");  // For Search Functionality

  // Handle adding new role
  const handleAddRole = (e) => {
    e.preventDefault();
    if (newRole.name && newRole.description) {
      const role = { ...newRole, id: roles.length + 1, users: 0 };
      setRoles([...roles, role]);
      resetForm();
      setIsModalOpen(false);
    }
  };

  // Handle role editing
  const handleEditRole = (role) => {
    setEditMode(true);
    setEditRoleId(role.id);
    setNewRole(role);
    setIsModalOpen(true);
  };

  // Handle role deletion
  const handleDeleteRole = (id) => {
    setRoles(roles.filter((role) => role.id !== id));
  };

  // Handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setNewRole({ ...newRole, [name]: value });
  };

  // Reset form fields
  const resetForm = () => {
    setNewRole({ name: "", description: "", type: "Default" });
    setEditMode(false);
    setEditRoleId(null);
  };

  // Toggle Modal Open
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Filter roles by search query
  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="sidebar">
        <h3>VSecure</h3>
        <ul>
          <li><FaTachometerAlt /> Dashboard</li>
          <li><FaCog /> </li>
        </ul>
        <div className="sidebar-footer">
          <ul>
            <li><FaSignOutAlt /> Logout</li>
          </ul>
        </div>
      </div>

      <div className="main-content">
        <div className="navbar">
          <div className="navbar-left">
            <h3>VSecure</h3>
          </div>
          <div className="navbar-right">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Roles"
            />
            <div
              className="navbar-user"
              onClick={() => document.querySelector(".navbar-user").classList.toggle("active")}
            >
              <span>Username</span>
              <div className="navbar-user-options">
                <a href="#">Profile</a>
                <a href="#">Logout</a>
              </div>
            </div>
          </div>
        </div>

        <div className="header-right">
          <button className="add-button" onClick={toggleModal}>
            Add Role
          </button>
        </div>

        <h3 className="user-role-header"><b>User Role Management</b></h3>

        <div className="table-section">
          <table className="data-table">
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Description</th>
                <th>Users</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.map((role) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>{role.description}</td>
                  <td>{role.users}</td>
                  <td>{role.type}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEditRole(role)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{editMode ? "Edit Role" : "Add Role"}</h2>
              <form onSubmit={handleAddRole}>
                <input
                  type="text"
                  name="name"
                  value={newRole.name}
                  onChange={handleFieldChange}
                  placeholder="Role Name"
                />
                <textarea
                  name="description"
                  value={newRole.description}
                  onChange={handleFieldChange}
                  placeholder="Role Description"
                />
                <select
                  name="type"
                  value={newRole.type}
                  onChange={handleFieldChange}
                >
                  <option value="Default">Default</option>
                  <option value="Custom">Custom</option>
                </select>
                <div className="modal-actions">
                  <button type="submit" className="save-button">
                    Save
                  </button>
                  <button type="button" className="cancel-button" onClick={toggleModal}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
