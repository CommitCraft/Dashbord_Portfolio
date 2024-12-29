import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';
import axios from 'axios';

// Modal for Adding or Editing Skill
const SkillFormModal = ({ isVisible, onClose, onSubmit, formData, isEditing }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setLocalFormData((prevState) => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(localFormData);
    onClose();
  };

  return (
    isVisible && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Skill' : 'Add New Skill'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={localFormData.title || ''}
                onChange={handleChange}
                className="border p-2 mt-1 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={localFormData.name || ''}
                onChange={handleChange}
                className="border p-2 mt-1 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="border p-2 mt-1 w-full"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                {isEditing ? 'Update' : 'Submit'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentSkill, setCurrentSkill] = useState({
    id: null,
    title: '',
    name: '',
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/skills`);
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills data:', error);
    }
  };

  const handleAddNewSkill = () => {
    setCurrentSkill({ id: null, title: '', name: '', image: null });
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
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  const handleSubmit = async (skillData) => {
    const formData = new FormData();

    // Append fields to FormData
    Object.keys(skillData).forEach((key) => {
      if (key === 'image' && skillData.image && typeof skillData.image !== 'string') {
        formData.append(key, skillData.image); // Append file only if it's a File object
      } else if (key !== 'image') {
        formData.append(key, skillData[key]);
      }
    });

    // Debugging FormData
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      let response;
      if (skillData.id) {
        // Update existing skill
        response = await axios.put(`${API_BASE_URL}/skills/${skillData.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSkills((prevSkills) =>
          prevSkills.map((skill) => (skill.id === skillData.id ? response.data : skill))
        );
      } else {
        // Add new skill
        response = await axios.post(`${API_BASE_URL}/skills`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setSkills((prevSkills) => [...prevSkills, response.data]);
      }
    } catch (error) {
      console.error('Error submitting skill:', error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>

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
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">Title</th>
            <th className="border border-gray-200 p-2 text-left">Name</th>
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
                {skill.image ? (
                  <img
                    src={`${API_BASE_URL.replace('/api', '')}${skill.image}`}
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

      <SkillFormModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
        formData={currentSkill}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Skills;
