import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    message: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch contacts from API
  useEffect(() => {
    setLoading(true);
    axios.get(`${API_BASE_URL}/contacts`)
      .then(response => {
        setContacts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching contacts', error);
        setLoading(false);
      });
  }, [API_BASE_URL]);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Submit new or updated contact data
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      // Update contact
      axios.put(`${API_BASE_URL}/contacts/${formData.id}`, formData, {
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => {
          setContacts(contacts.map(contact => contact.id === formData.id ? response.data : contact));
          setIsEditing(false);
          setIsFormVisible(false);
          resetForm();
        })
        .catch(error => console.error('Error updating contact', error.response));
    } else {
      // Add new contact
      axios.post(`${API_BASE_URL}/contacts`, formData, {
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => {
          setContacts([...contacts, response.data]);
          setIsFormVisible(false);
          resetForm();
        })
        .catch(error => console.error('Error adding contact', error.response));
    }
  };

  // Delete a contact
  const handleDelete = (id) => {
    axios.delete(`${API_BASE_URL}/contacts/${id}`)
      .then(() => {
        setContacts(contacts.filter(contact => contact.id !== id));
      })
      .catch(error => console.error('Error deleting contact', error));
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      email: '',
      message: ''
    });
  };

  // Show form with reset data for adding a new contact
  const handleAddNewContact = () => {
    resetForm();
    setIsEditing(false);
    setIsFormVisible(true);
  };

  // Show form for editing a contact
  const handleEditContact = (contact) => {
    setFormData(contact);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  // Cancel form visibility
  const handleCancelForm = () => {
    setIsFormVisible(false);
    setIsEditing(false);
    resetForm();
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Contact Management</h2>

      {/* Add New Contact Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2"
          onClick={handleAddNewContact}
        >
          <FaPlus />
          Add New Contact
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && <p>Loading contacts...</p>}

      {/* Form for Adding or Editing Contact */}
      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 max-w-4xl relative">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCancelForm}
            >
              <FaTimes size={24} />
            </button>

            <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Contact' : 'Add New Contact'}</h3>
            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-96">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-4">
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                  {isEditing ? 'Update' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display Contacts in Table Format */}
      <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">Name</th>
            <th className="border border-gray-200 p-2 text-left">Email</th>
            <th className="border border-gray-200 p-2 text-left">Message</th>
            <th className="border border-gray-200 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-2">{contact.name}</td>
              <td className="border border-gray-200 p-2">{contact.email}</td>
              <td className="border border-gray-200 p-2">{contact.message}</td>
              <td className="border border-gray-200 p-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditContact(contact)}
                    className="text-blue-500 hover:underline"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="text-red-500 hover:underline"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contact;
