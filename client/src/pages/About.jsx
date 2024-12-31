import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';

const About = () => {
  const [bioData, setBioData] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    roles: '',
    description: '',
    github: '',
    linkedin: '',
    twitter: '',
    insta: '',
    facebook: '',
    resume: null,
    image: null,
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/about`);
        setBioData(response.data);
      } catch (error) {
        console.error('Error fetching bio data:', error);
        alert('Failed to fetch bio data. Please try again later.');
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const formatUrl = (baseUrl, path) => {
    if (!baseUrl.endsWith('/')) baseUrl += '/';
    if (path.startsWith('/')) path = path.slice(1);
    return `${baseUrl}${path}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.roles || !formData.description) {
      alert('Please fill all required fields!');
      return;
    }

    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined && formData[key] !== '') {
        if (key === 'roles') {
          formDataToSubmit.append(key, JSON.stringify(formData[key].split(',').map(role => role.trim())));
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      }
    });

    try {
      const url = isEditing
        ? `${import.meta.env.VITE_API_BASE_URL}/about/${formData.id}`
        : `${import.meta.env.VITE_API_BASE_URL}/about`;

      const response = await axios({
        method: isEditing ? 'put' : 'post',
        url,
        data: formDataToSubmit,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setBioData((prev) =>
        isEditing
          ? prev.map((bio) => (bio.id === formData.id ? response.data : bio))
          : [...prev, response.data]
      );

      resetForm();
      setIsFormVisible(false);
    } catch (error) {
      console.error('Error saving bio data:', error.response || error.message);
      alert('Failed to save data. Please try again later.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/about/${id}`);
      setBioData((prev) => prev.filter((bio) => bio.id !== id));
    } catch (error) {
      console.error('Error deleting bio data:', error);
      alert('Failed to delete. Please try again later.');
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      roles: '',
      description: '',
      github: '',
      linkedin: '',
      twitter: '',
      insta: '',
      facebook: '',
      resume: null,
      image: null,
    });
  };

  const handleAddNewBio = () => {
    resetForm();
    setIsEditing(false);
    setIsFormVisible(true);
  };

  const handleEditBio = (bio) => {
    setFormData({
      ...bio,
      roles: Array.isArray(bio.roles) ? bio.roles.join(', ') : bio.roles,
    });
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    resetForm();
    setIsFormVisible(false);
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">About Me</h2>
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2"
          onClick={handleAddNewBio}
        >
          <FaPlus />
          Add New Bio
        </button>
      </div>

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
              {isEditing ? 'Edit Bio' : 'Add New Bio'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
                <InputField
                  label="Roles (comma-separated)"
                  name="roles"
                  value={formData.roles}
                  onChange={handleChange}
                />
                <TextareaField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <InputField label="GitHub" name="github" value={formData.github} onChange={handleChange} />
                <InputField label="Instagram" name="insta" value={formData.insta} onChange={handleChange} />
                <InputField label="Facebook" name="facebook" value={formData.facebook} onChange={handleChange} />
                <InputField label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FileField label="Profile Image" name="image" onChange={handleChange} accept="image/*" />
                <FileField label="Resume" name="resume" onChange={handleChange} accept=".pdf,.doc,.docx" />
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

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-sm md:text-base">Image</th>
              <th className="p-3 text-sm md:text-base">Name</th>
              <th className="p-3 text-sm md:text-base">Roles</th>
              <th className="p-3 text-sm md:text-base">Description</th>
              <th className="p-3 text-sm md:text-base">GitHub</th>
              <th className="p-3 text-sm md:text-base">Instagram</th>
              <th className="p-3 text-sm md:text-base">Facebook</th>
              <th className="p-3 text-sm md:text-base">LinkedIn</th>
              <th className="p-3 text-sm md:text-base">Resume</th>
              <th className="p-3 text-sm md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bioData.map((bio) => (
              <tr key={bio.id} className="hover:bg-gray-50 text-xs md:text-sm">
                <td className="p-3">
                  {bio.image && (
                    <img
                      src={formatUrl(import.meta.env.VITE_API_BASE_URL.replace('/api', ''), bio.image)}
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                </td>
                <td className="p-3">{bio.name}</td>
                <td className="p-3">{bio.roles}</td>
                <td className="p-3 max-w-xs overflow-y-auto">
                  <div className="max-h-24 overflow-y-auto">{bio.description}</div>
                </td>
                <td className="p-3">
                  {bio.github && <a href={bio.github} target="_blank" className="text-blue-600 underline">View</a>}
                </td>
                <td className="p-3">
                  {bio.insta && <a href={bio.insta} target="_blank" className="text-blue-600 underline">View</a>}
                </td>
                <td className="p-3">
                  {bio.facebook && <a href={bio.facebook} target="_blank" className="text-blue-600 underline">View</a>}
                </td>
                <td className="p-3">
                  {bio.linkedin && <a href={bio.linkedin} target="_blank" className="text-green-600 underline">View</a>}
                </td>
                <td className="p-3">
                  {bio.resume && (
                    <a
                      href={formatUrl(import.meta.env.VITE_API_BASE_URL.replace('/api', ''), bio.resume)}
                      target="_blank"
                      className="text-red-600 underline"
                    >
                      Download
                    </a>
                  )}
                </td>
                <td className="p-3 flex space-x-2">
                  <button
                    onClick={() => handleEditBio(bio)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(bio.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input {...props} className="border p-2 mt-1 w-full" />
  </div>
);

const TextareaField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <textarea {...props} className="border p-2 mt-1 w-full" />
  </div>
);

const FileField = ({ label, ...props }) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input type="file" {...props} className="border p-2 mt-1 w-full" />
  </div>
);

export default About;
