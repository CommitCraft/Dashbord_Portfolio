import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    description: '',
    github: '',
    liveLink: '',
    technologies: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects data from API
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/projects`)
      .then(response => {
        setProjects(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching projects data', error);
        setIsLoading(false);
      });
  }, []);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Submit new or updated project
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description) {
      alert('Title and description are required.');
      return;
    }

    if (isEditing) {
      // Update project
      axios.put(`${import.meta.env.VITE_API_BASE_URL}/projects/${formData.id}`, formData)
        .then(response => {
          setProjects(projects.map(project => (project.id === formData.id ? response.data : project)));
          setIsEditing(false);
          setIsFormVisible(false);
          resetForm();
          alert('Project updated successfully!');
        })
        .catch(error => alert('Error updating project.'));
    } else {
      // Add new project
      axios.post(`${import.meta.env.VITE_API_BASE_URL}/projects`, formData)
        .then(response => {
          setProjects([...projects, response.data]);
          setIsFormVisible(false);
          resetForm();
          alert('Project added successfully!');
        })
        .catch(error => alert('Error adding project.'));
    }
  };

  // Delete a project
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      axios.delete(`${import.meta.env.VITE_API_BASE_URL}/projects/${id}`)
        .then(() => {
          setProjects(projects.filter(project => project.id !== id));
        })
        .catch(error => alert('Error deleting project.'));
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({
      id: null,
      title: '',
      description: '',
      github: '',
      liveLink: '',
      technologies: ''
    });
  };

  // Show form with reset data for adding a new project
  const handleAddNewProject = () => {
    resetForm();
    setIsEditing(false);
    setIsFormVisible(true);
  };

  // Show form for editing a project
  const handleEditProject = (project) => {
    setFormData(project);
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
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>

      {/* Add New Project Button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2"
          onClick={handleAddNewProject}
        >
          <FaPlus />
          Add New Project
        </button>
      </div>

      {/* Form for Adding or Editing Project */}
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

            <h3 className="text-lg font-semibold mb-4">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
            <form onSubmit={handleSubmit} className="overflow-y-auto max-h-96">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Technologies (comma separated)</label>
                  <input
                    type="text"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
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
                  <label className="block text-sm font-medium">Live Link</label>
                  <input
                    type="url"
                    name="liveLink"
                    value={formData.liveLink}
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

      {/* Display Projects Data in Table Format */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-2 text-left">Title</th>
              <th className="border border-gray-200 p-2 text-left">Technologies</th>
              <th className="border border-gray-200 p-2 text-left">Description</th>
              <th className="border border-gray-200 p-2 text-left">GitHub</th>
              <th className="border border-gray-200 p-2 text-left">Live Link</th>
              <th className="border border-gray-200 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="border border-gray-200 p-2">{project.title}</td>
                <td className="border border-gray-200 p-2">{project.technologies}</td>
                <td className="border border-gray-200 p-2">{project.description}</td>
                <td className="border border-gray-200 p-2">
                  {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>}
                </td>
                <td className="border border-gray-200 p-2">
                  {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Link</a>}
                </td>
                <td className="border border-gray-200 p-2">
                  <button onClick={() => handleEditProject(project)} className="text-blue-500 hover:text-blue-700">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="ml-2 text-red-500 hover:text-red-700">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Projects;
