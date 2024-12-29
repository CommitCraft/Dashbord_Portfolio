import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from "react-icons/fa";
import axios from "axios";

// Modal for Adding or Editing Experience
const ExperienceFormModal = ({ isVisible, onClose, onSubmit, formData, isEditing }) => {
  const [localFormData, setLocalFormData] = useState(formData);

  useEffect(() => {
    setLocalFormData(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setLocalFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
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
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <FaTimes size={20} />
          </button>

          <h3 className="text-lg font-semibold mb-4">{isEditing ? "Edit Experience" : "Add New Experience"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="overflow-y-auto max-h-96">
              <div className="mb-4">
                <label className="block text-sm font-medium">Image</label>
                <input
                  type="file"
                  name="img"
                  onChange={handleChange}
                  className="border p-2 mt-1 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Role</label>
                <input
                  type="text"
                  name="role"
                  value={localFormData.role}
                  onChange={handleChange}
                  className="border p-2 mt-1 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Company</label>
                <input
                  type="text"
                  name="company"
                  value={localFormData.company}
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
                <label className="block text-sm font-medium">Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={localFormData.skills}
                  onChange={handleChange}
                  placeholder="Comma-separated (e.g., React, Node.js)"
                  className="border p-2 mt-1 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Document</label>
                <input
                  type="file"
                  name="doc"
                  onChange={handleChange}
                  className="border p-2 mt-1 w-full"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                {isEditing ? "Update" : "Submit"}
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

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentExperience, setCurrentExperience] = useState({
    id: null,
    img: "",
    role: "",
    company: "",
    date: "",
    desc: "",
    skills: "",
    doc: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/experiences`);
      setExperiences(response.data);
    } catch (error) {
      console.error("Error fetching experiences data:", error);
    }
  };

  const handleAddNewExperience = () => {
    setCurrentExperience({
      id: null,
      img: "",
      role: "",
      company: "",
      date: "",
      desc: "",
      skills: "",
      doc: "",
    });
    setIsEditing(false);
    setIsModalVisible(true);
  };

  const handleEditExperience = (experienceItem) => {
    setCurrentExperience(experienceItem);
    setIsEditing(true);
    setIsModalVisible(true);
  };

  const handleDeleteExperience = async (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      try {
        await axios.delete(`${API_BASE_URL}/experiences/${id}`);
        setExperiences((prevExperiences) =>
          prevExperiences.filter((experienceItem) => experienceItem.id !== id)
        );
      } catch (error) {
        console.error("Error deleting experience:", error);
      }
    }
  };

  const handleSubmit = async (experienceData) => {
    const formData = new FormData();
    Object.keys(experienceData).forEach((key) => {
      formData.append(key, experienceData[key]);
    });

    try {
      let response;
      if (experienceData.id) {
        response = await axios.put(
          `${API_BASE_URL}/experiences/${experienceData.id}`,
          formData
        );
        setExperiences((prevExperiences) =>
          prevExperiences.map((experienceItem) =>
            experienceItem.id === experienceData.id
              ? { ...experienceItem, ...experienceData }
              : experienceItem
          )
        );
      } else {
        response = await axios.post(`${API_BASE_URL}/experiences`, formData);
        setExperiences((prevExperiences) => [...prevExperiences, response.data]);
      }
    } catch (error) {
      console.error("Error submitting experience:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Experience</h2>

      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2"
          onClick={handleAddNewExperience}
        >
          <FaPlus />
          Add New Experience
        </button>
      </div>

      <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">Role</th>
            <th className="border border-gray-200 p-2 text-left">Company</th>
            <th className="border border-gray-200 p-2 text-left">Date</th>
            <th className="border border-gray-200 p-2 text-left">Image</th>
            <th className="border border-gray-200 p-2 text-left">Document</th>
            <th className="border border-gray-200 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {experiences.map((experienceItem) => (
            <tr key={experienceItem.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-2">{experienceItem.role}</td>
              <td className="border border-gray-200 p-2">{experienceItem.company}</td>
              <td className="border border-gray-200 p-2">{experienceItem.date}</td>
              <td className="border border-gray-200 p-2">
                {experienceItem.img && (
                  <img
                    src={`${API_BASE_URL}/${experienceItem.img}`}
                    alt="Experience"
                    className="h-12 w-auto rounded border"
                  />
                )}
              </td>
              <td className="border border-gray-200 p-2">
                {experienceItem.doc && (
                  <a
                    href={`${API_BASE_URL}/${experienceItem.doc}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Document
                  </a>
                )}
              </td>
              <td className="border border-gray-200 p-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditExperience(experienceItem)}
                    className="text-blue-500 hover:underline"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(experienceItem.id)}
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

      <ExperienceFormModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
        formData={currentExperience}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Experience;
