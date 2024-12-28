import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';

const EducationFormModal = ({ isVisible, onClose, onSubmit, formData, isEditing }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setLocalFormData((prev) => ({
      ...prev,
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
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90%] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
          <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Education' : 'Add New Education'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium">School</label>
              <input
                type="text"
                name="school"
                value={localFormData.school || ''}
                onChange={handleChange}
                className="border p-2 mt-1 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Degree</label>
              <input
                type="text"
                name="degree"
                value={localFormData.degree || ''}
                onChange={handleChange}
                className="border p-2 mt-1 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Date</label>
              <input
                type="text"
                name="date"
                value={localFormData.date || ''}
                onChange={handleChange}
                className="border p-2 mt-1 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Grade</label>
              <input
                type="text"
                name="grade"
                value={localFormData.grade || ''}
                onChange={handleChange}
                className="border p-2 mt-1 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                name="desc"
                value={localFormData.desc || ''}
                onChange={handleChange}
                className="border p-2 mt-1 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Image</label>
              <input
                type="file"
                name="img"
                onChange={handleChange}
                className="border p-2 mt-1 w-full"
              />
              {localFormData.img && typeof localFormData.img === 'string' && (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${localFormData.img}`}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
            </div>
            <div className="flex justify-end gap-4">
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                {isEditing ? 'Update' : 'Submit'}
              </button>
              <button type="button" onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

const Education = () => {
  const [education, setEducation] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEducation, setCurrentEducation] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/education`;

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setEducation(response.data);
    } catch (error) {
      console.error('Error fetching education:', error);
    }
  };

  const handleAddNew = () => {
    setCurrentEducation({});
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEdit = (edu) => {
    setCurrentEducation(edu);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        fetchEducation();
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handleSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      if (data.id) {
        await axios.put(`${API_BASE_URL}/${data.id}`, formData);
      } else {
        await axios.post(API_BASE_URL, formData);
      }
      fetchEducation();
    } catch (error) {
      console.error('Error submitting education:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Education</h2>
      <button onClick={handleAddNew} className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2">
        <FaPlus /> Add New
      </button>
      <table className="table-auto w-full mt-4 border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">School</th>
            <th className="border p-2">Degree</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {education.map((edu) => (
            <tr key={edu.id}>
              <td className="border p-2">{edu.school}</td>
              <td className="border p-2">{edu.degree}</td>
              <td className="border p-2">{edu.date}</td>
              <td className="border p-2">
                {edu.img && (
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${edu.img}`}
                    alt={edu.school}
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="border p-2">
                <button onClick={() => handleEdit(edu)} className="text-blue-500 mr-2">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(edu.id)} className="text-red-500">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EducationFormModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
        formData={currentEducation}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Education;
