import React, { useEffect, useState } from 'react';
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
    resume: null,
    linkedin: '',
    twitter: '',
    insta: '',
    facebook: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch bio data from API
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/bio`)
      .then(response => {
        setBioData(response.data);
      })
      .catch(error => {
        console.error('Error fetching bio data', error);
      });
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  // Submit new or updated bio data
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      formDataToSubmit.append(key, formData[key]);
    });

    if (isEditing) {
      // Update bio item
      axios.put(`${import.meta.env.VITE_API_BASE_URL}/bio/${formData.id}`, formDataToSubmit)
        .then(response => {
          setBioData(bioData.map(bio => (bio.id === formData.id ? response.data : bio)));
          setIsEditing(false);
          setIsFormVisible(false);
          resetForm();
        })
        .catch(error => console.error('Error updating bio data', error));
    } else {
      // Add new bio item
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/bio`, formDataToSubmit)
        .then(response => {
          setBioData([...bioData, response.data]);
          setIsFormVisible(false);
          resetForm();
        })
        .catch(error => console.error('Error adding bio data', error));
    }
  };

  // Delete a bio entry
  const handleDelete = (id) => {
    axios.delete(`${import.meta.env.VITE_API_BASE_URL}/bio/${id}`)
      .then(() => {
        setBioData(bioData.filter(bio => bio.id !== id));
      })
      .catch(error => console.error('Error deleting bio data', error));
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      id: null,
      name: '',
      roles: '',
      description: '',
      github: '',
      resume: null,
      linkedin: '',
      twitter: '',
      insta: '',
      facebook: ''
    });
  };

  // Show form with reset data for adding a new bio
  const handleAddNewBio = () => {
    resetForm();
    setIsEditing(false);
    setIsFormVisible(true);
  };

  // Show form for editing a bio
  const handleEditBio = (bio) => {
    setFormData(bio);
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
      <h2 className="text-2xl font-semibold mb-4">About Me</h2>

      {/* Add New Bio Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2"
          onClick={handleAddNewBio}
        >
          <FaPlus />
          Add New Bio
        </button>
      </div>

      {/* Form for Adding or Editing Bio */}
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

            <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Bio' : 'Add New Bio'}</h3>
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
                  <label className="block text-sm font-medium">Roles (comma separated)</label>
                  <input
                    type="text"
                    name="roles"
                    value={formData.roles}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                    required
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">GitHub</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Resume</label>
                  <input
                    type="file"
                    name="resume"
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">LinkedIn</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Twitter</label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Instagram</label>
                  <input
                    type="url"
                    name="insta"
                    value={formData.insta}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div className="col-span-2">
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

      {/* Display Bio Data in Table Format */}
      <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2 text-left">Name</th>
            <th className="border border-gray-200 p-2 text-left">Roles</th>
            <th className="border border-gray-200 p-2 text-left">Description</th>
            <th className="border border-gray-200 p-2 text-left">GitHub</th>
            <th className="border border-gray-200 p-2 text-left">Resume</th>
            <th className="border border-gray-200 p-2 text-left">LinkedIn</th>
            <th className="border border-gray-200 p-2 text-left">Twitter</th>
            <th className="border border-gray-200 p-2 text-left">Instagram</th>
            <th className="border border-gray-200 p-2 text-left">Facebook</th>
            <th className="border border-gray-200 p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bioData.map((bio) => (
            <tr key={bio.id} className="hover:bg-gray-50">
              <td className="border border-gray-200 p-2">{bio.name}</td>
              <td className="border border-gray-200 p-2">{Array.isArray(bio.roles) ? bio.roles.join(', ') : bio.roles}</td>
              <td className="border border-gray-200 p-2">{bio.description}</td>
              <td className="border border-gray-200 p-2">
                <a href={bio.github} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  View
                </a>
              </td>
              <td className="border border-gray-200 p-2">
                {bio.resume && (
                  <a href={bio.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    Download
                  </a>
                )}
              </td>
              <td className="border border-gray-200 p-2">
                <a href={bio.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  View
                </a>
              </td>
              <td className="border border-gray-200 p-2">
                {bio.twitter && (
                  <a href={bio.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View
                  </a>
                )}
              </td>
              <td className="border border-gray-200 p-2">
                {bio.insta && (
                  <a href={bio.insta} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View
                  </a>
                )}
              </td>
              <td className="border border-gray-200 p-2">
                {bio.facebook && (
                  <a href={bio.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    View
                  </a>
                )}
              </td>
              <td className="border border-gray-200 p-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEditBio(bio)}
                    className="text-blue-500 hover:underline"
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(bio.id)}
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

export default About;
