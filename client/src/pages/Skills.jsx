import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Utility function to normalize URL paths
const joinURL = (base, path) => {
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
};

const CategoriesTable = ({ categories, onDelete }) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-200 p-2 text-left">ID</th>
            <th className="border border-gray-200 p-2 text-left">Name</th>
            <th className="border border-gray-200 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-2">{category.id}</td>
              <td className="border border-gray-200 p-2">{category.name}</td>
              <td className="border border-gray-200 p-2">
                <button
                  onClick={() => onDelete(category.id)}
                  className="text-red-500 hover:underline"
                >
                  <FaTrashAlt size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({
    id: null,
    title: '',
    name: '',
    categoryId: '',
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchSkills();
    fetchCategories();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/skills`);
      setSkills(response.data);
    } catch (error) {
      toast.error('Failed to fetch skills.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/skill-categories`);
      setCategories(response.data);
    } catch (error) {
      toast.error('Failed to fetch categories.');
    }
  };

  const handleAddNewSkill = () => {
    setCurrentSkill({ id: null, title: '', name: '', categoryId: '', image: null });
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEditSkill = (skill) => {
    setCurrentSkill(skill);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleDeleteSkill = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await axios.delete(`${API_BASE_URL}/skills/${id}`);
        setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
        toast.success('Skill deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete skill.');
      }
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`${API_BASE_URL}/skill-categories/${id}`);
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
        toast.success('Category deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete category.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.keys(currentSkill).forEach((key) => {
      if (key === 'image' && currentSkill.image && typeof currentSkill.image !== 'string') {
        formData.append(key, currentSkill.image);
      } else if (key !== 'image') {
        formData.append(key, currentSkill[key]);
      }
    });

    try {
      if (isEditing) {
        const response = await axios.put(
          `${API_BASE_URL}/skills/${currentSkill.id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        setSkills((prevSkills) =>
          prevSkills.map((skill) => (skill.id === currentSkill.id ? response.data : skill))
        );
        toast.success('Skill updated successfully!');
      } else {
        const response = await axios.post(`${API_BASE_URL}/skills`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSkills((prevSkills) => [...prevSkills, response.data]);
        toast.success('Skill added successfully!');
      }
      setIsModalVisible(false);
    } catch (error) {
      toast.error('Failed to save skill.');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <ToastContainer />
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2"
              onClick={handleAddNewSkill}
            >
              <FaPlus />
              Add New Skill
            </button>
          </div>

          <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-200 p-2 text-left">Title</th>
                <th className="border border-gray-200 p-2 text-left">Name</th>
                <th className="border border-gray-200 p-2 text-left">Category</th>
                <th className="border border-gray-200 p-2 text-left">Image</th>
                <th className="border border-gray-200 p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.id} className="hover:bg-gray-50">
                  <td className="border border-gray-200 p-2">{skill.title}</td>
                  <td className="border border-gray-200 p-2">{skill.name}</td>
                  <td className="border border-gray-200 p-2">
                    {categories.find((cat) => cat.id === skill.categoryId)?.name || 'N/A'}
                  </td>
                  <td className="border border-gray-200 p-2">
                    {skill.image ? (
                      <img
                        src={joinURL(API_BASE_URL.replace('/api', ''), skill.image)}
                        alt={skill.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>
                  <td className="border border-gray-200 p-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditSkill(skill)}
                        className="text-blue-500 hover:underline"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
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

          <CategoriesTable categories={categories} onDelete={handleDeleteCategory} />
        </>
      )}

      {isModalVisible && (
        <div className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? 'Edit Skill' : 'Add New Skill'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={currentSkill.title}
                  onChange={(e) => setCurrentSkill({ ...currentSkill, title: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={currentSkill.name}
                  onChange={(e) => setCurrentSkill({ ...currentSkill, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={currentSkill.categoryId}
                  onChange={(e) =>
                    setCurrentSkill({ ...currentSkill, categoryId: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Image</label>
                <input
                  type="file"
                  onChange={(e) =>
                    setCurrentSkill({ ...currentSkill, image: e.target.files[0] })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalVisible(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                  {isEditing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
