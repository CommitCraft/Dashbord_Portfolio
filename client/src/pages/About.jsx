import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';

const About = () => {
  const [bioData, setBioData] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    roles: '', // Comma-separated input for roles
    description: '',
    github: '',
    resume: null, // File upload
    image: null, // Image upload
    linkedin: '',
    twitter: '',
    insta: '',
    facebook: '',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/about`)
      .then((response) => setBioData(response.data))
      .catch((error) => console.error('Error fetching bio data:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();

    // Convert roles to JSON array format
    const rolesArray = formData.roles.split(',').map((role) => role.trim());
    const finalData = { ...formData, roles: JSON.stringify(rolesArray) };

    Object.keys(finalData).forEach((key) => {
      formDataToSubmit.append(key, finalData[key]);
    });

    const apiCall = isEditing
      ? axios.put(`${import.meta.env.VITE_API_BASE_URL}/about/${formData.id}`, formDataToSubmit)
      : axios.post(`${import.meta.env.VITE_API_BASE_URL}/about`, formDataToSubmit);

    apiCall
      .then((response) => {
        if (isEditing) {
          setBioData(bioData.map((bio) => (bio.id === formData.id ? response.data : bio)));
        } else {
          setBioData([...bioData, response.data]);
        }
        resetForm();
        setIsFormVisible(false);
      })
      .catch((error) => console.error('Error saving bio data:', error));
  };

  const handleDelete = (id) => {
    axios
      .delete(`${import.meta.env.VITE_API_BASE_URL}/about/${id}`)
      .then(() => setBioData(bioData.filter((bio) => bio.id !== id)))
      .catch((error) => console.error('Error deleting bio data:', error));
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      roles: '',
      description: '',
      github: '',
      resume: null,
      image: null,
      linkedin: '',
      twitter: '',
      insta: '',
      facebook: '',
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
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 max-w-4xl relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCancelForm}
            >
              <FaTimes size={24} />
            </button>
            <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Bio' : 'Add New Bio'}</h3>
            <form onSubmit={handleSubmit}>
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
                  <label className="block text-sm font-medium">Roles (comma-separated)</label>
                  <input
                    type="text"
                    name="roles"
                    value={formData.roles}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Profile Image</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Resume</label>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf"
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Twitter</label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Instagram</label>
                  <input
                    type="url"
                    name="insta"
                    value={formData.insta}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Facebook</label>
                  <input
                    type="url"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
                  {isEditing ? 'Update' : 'Submit'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="ml-4 bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Roles</th>
            <th className="p-2">Description</th>
            <th className="p-2">GitHub</th>
            <th className="p-2">LinkedIn</th>
            <th className="p-2">Twitter</th>
            <th className="p-2">Instagram</th>
            <th className="p-2">Facebook</th>
            <th className="p-2">Resume</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bioData.map((bio) => (
            <tr key={bio.id}>
              <td className="p-2">
                {bio.image && <img src={bio.image} alt="Profile" className="w-12 h-12 rounded-full" />}
              </td>
              <td className="p-2">{bio.name}</td>
              <td className="p-2">{Array.isArray(bio.roles) ? bio.roles.join(', ') : bio.roles}</td>
              <td className="p-2">{bio.description}</td>
              <td className="p-2">
                {bio.github && (
                  <a href={bio.github} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View
                  </a>
                )}
              </td>
              <td className="p-2">
                {bio.linkedin && (
                  <a href={bio.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View
                  </a>
                )}
              </td>
              <td className="p-2">
                {bio.twitter && (
                  <a href={bio.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View
                  </a>
                )}
              </td>
              <td className="p-2">
                {bio.insta && (
                  <a href={bio.insta} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View
                  </a>
                )}
              </td>
              <td className="p-2">
                {bio.facebook && (
                  <a href={bio.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View
                  </a>
                )}
              </td>
              <td className="p-2">
                {bio.resume && (
                  <a href={bio.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View
                  </a>
                )}
              </td>
              <td className="p-2">
                <button onClick={() => handleEditBio(bio)} className="mr-2 text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(bio.id)} className="text-red-500">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default About;
