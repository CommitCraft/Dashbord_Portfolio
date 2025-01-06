import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '' });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [categoryType, setCategoryType] = useState('skill-categories'); // 'skill-categories' or 'project-categories'
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchCategories();
  }, [categoryType]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/${categoryType}`);
      setCategories(response.data);
      toast.success(`Fetched ${categoryType} successfully!`);
    } catch (error) {
      console.error(`Error fetching ${categoryType}:`, error);
      toast.error(`Failed to fetch ${categoryType}. Please try again later.`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || formData.name.length > 50) {
      toast.error('Category name must be between 1 and 50 characters.');
      return;
    }

    try {
      const url = isEditing
        ? `${API_BASE_URL}/${categoryType}/${formData.id}`
        : `${API_BASE_URL}/${categoryType}`;
      const method = isEditing ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: { name: formData.name },
      });

      setCategories((prev) =>
        isEditing
          ? prev.map((cat) => (cat.id === formData.id ? response.data : cat))
          : [...prev, response.data]
      );

      toast.success(`Category ${isEditing ? 'updated' : 'added'} successfully!`);
      resetForm();
      setIsFormVisible(false);
    } catch (error) {
      console.error(`Error saving ${categoryType}:`, error);
      toast.error(`Failed to save category. Please try again.`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/${categoryType}/${id}`);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      toast.success('Category deleted successfully!');
    } catch (error) {
      console.error(`Error deleting ${categoryType}:`, error);
      toast.error('Failed to delete category.');
    }
  };

  const resetForm = () => {
    setFormData({ id: null, name: '' });
    setIsEditing(false);
  };

  const handleAddNew = () => {
    resetForm();
    setIsFormVisible(true);
  };

  const handleEdit = (category) => {
    setFormData(category);
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    resetForm();
    setIsFormVisible(false);
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>

      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2">Category Type:</label>
          <select
            value={categoryType}
            onChange={(e) => setCategoryType(e.target.value)}
            className="border px-2 py-1"
          >
            <option value="skill-categories">Skill Categories</option>
            <option value="project-categories">Project Categories</option>
          </select>
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2"
          onClick={handleAddNew}
        >
          <FaPlus />
          Add New Category
        </button>
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-sm md:text-base">ID</th>
                <th className="p-3 text-sm md:text-base">Name</th>
                <th className="p-3 text-sm md:text-base">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 text-xs md:text-sm">
                  <td className="p-3">{category.id}</td>
                  <td className="p-3">{category.name}</td>
                  <td className="p-3 flex space-x-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="text-blue-500 hover:text-blue-700"
                      aria-label={`Edit ${category.name}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label={`Delete ${category.name}`}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCancelForm}
            >
              <FaTimes size={24} />
            </button>
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? 'Edit Category' : 'Add New Category'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Category Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 mt-1 w-full"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
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
    </div>
  );
};

export default Categories;
