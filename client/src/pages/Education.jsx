import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';
import axios from 'axios';

// Modal for Adding or Editing Education
const EducationFormModal = ({ isVisible, onClose, onSubmit, formData, isEditing }) => {
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
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[90%] overflow-hidden relative">
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
          
          <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Education' : 'Add New Education'}</h3>
          
          <form onSubmit={handleSubmit}>
            {/* Scrollable Input Fields Area */}
            <div className="max-h-[300px] overflow-y-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium">School</label>
                <input
                  type="text"
                  name="school"
                  value={localFormData.school}
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
                  value={localFormData.degree}
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
                  value={localFormData.date}
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
                  value={localFormData.grade}
                  onChange={handleChange}
                  className="border p-2 mt-1 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="desc"
                  value={localFormData.desc}
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
              </div>
            </div>
            
            {/* Footer with Submit and Close Buttons */}
            <div className="flex justify-end gap-4 mt-4">
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

const Education = () => {
  const [education, setEducation] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEducation, setCurrentEducation] = useState({
    id: null,
    img: '',
    school: '',
    date: '',
    grade: '',
    desc: '',
    degree: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  // Fetch education data from API
  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/education`);
      setEducation(response.data);
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };

  const handleAddNewEducation = () => {
    setCurrentEducation({
      id: null,
      img: '',
      school: '',
      date: '',
      grade: '',
      desc: '',
      degree: '',
    });
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEditEducation = (educationItem) => {
    setCurrentEducation(educationItem);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleDeleteEducation = async (id) => {
    if (window.confirm('Are you sure you want to delete this education?')) {
      try {
        await axios.delete(`${API_BASE_URL}/education/${id}`);
        setEducation((prevEducation) =>
          prevEducation.filter((educationItem) => educationItem.id !== id)
        );
      } catch (error) {
        console.error('Error deleting education:', error);
      }
    }
  };

  const handleSubmit = async (educationData) => {
    const formData = new FormData();
    
    // Append the education data to FormData, including image if provided
    Object.keys(educationData).forEach((key) => {
      formData.append(key, educationData[key]);
    });

    try {
      let response;
      const updateUrl = `${API_BASE_URL}/education/${educationData.id}`;
      if (educationData.id) {
        // Update existing education
        response = await axios.put(updateUrl, formData);
        setEducation((prevEducation) =>
          prevEducation.map((educationItem) =>
            educationItem.id === educationData.id ? { ...educationItem, ...educationData } : educationItem
          )
        );
      } else {
        // Add new education
        response = await axios.post(`${API_BASE_URL}/education`, formData);
        setEducation((prevEducation) => [...prevEducation, response.data]);
      }
    } catch (error) {
      console.error('Error submitting education:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Education</h2>

      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2"
          onClick={handleAddNewEducation}
        >
          <FaPlus />
          Add New Education
        </button>
      </div>

      {/* Education Table */}
      <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">School</th>
            <th className="border border-gray-200 p-2 text-left">Degree</th>
            <th className="border border-gray-200 p-2 text-left">Date</th>
            <th className="border border-gray-200 p-2 text-left">Grade</th>
            <th className="border border-gray-200 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {education.map((educationItem) => (
            <tr key={educationItem.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-2">{educationItem.school}</td>
              <td className="border border-gray-200 p-2">{educationItem.degree}</td>
              <td className="border border-gray-200 p-2">{educationItem.date}</td>
              <td className="border border-gray-200 p-2">{educationItem.grade}</td>
              <td className="border border-gray-200 p-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditEducation(educationItem)}
                    className="text-blue-500 hover:underline"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteEducation(educationItem.id)}
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

      {/* Modal for Adding or Editing Education */}
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
