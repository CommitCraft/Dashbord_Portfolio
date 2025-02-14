import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrashAlt, FaPlus, FaTimes } from "react-icons/fa";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    github: "",
    webapp: "",
    tags: "",
    category: "",
    iconImage: null,
    images: [],
  });
  const [categories] = useState([
        "Full-Stack",
    "Frontend",
    "Mini-Project's",
    "Android App's",
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/projects`
        );
        setProjects(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length) {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "images" ? Array.from(files) : files[0],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) {
      alert("All fields are required.");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("github", formData.github);
      formDataToSend.append("webapp", formData.webapp);
      formDataToSend.append("tags", JSON.stringify(formData.tags.split(","))); // Convert tags to JSON array
      formDataToSend.append("category", formData.category);

      if (formData.iconImage instanceof File) {
        formDataToSend.append("iconImage", formData.iconImage);
      }

      if (formData.images.length) {
        formData.images.forEach((image) => {
          formDataToSend.append("images", image);
        });
      }

      if (isEditing) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/projects/${formData.id}`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        alert("Project updated successfully!");
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/projects`,
          formDataToSend,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setProjects([...projects, response.data.data]);
        alert("Project added successfully!");
      }

      setIsFormVisible(false);
      resetForm();
    } catch (error) {
      console.error(
        "Error submitting project:",
        error.response?.data || error.message
      );
      alert("Error submitting project.");
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      description: "",
      github: "",
      webapp: "",
      tags: "",
      category: "",
      iconImage: null,
      images: [],
    });
  };

  const handleEdit = (project) => {
    setFormData({
      ...project,
      tags: project.tags ? project.tags.join(", ") : "", // Convert tags array to comma-separated string
    });
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/projects/${id}`
        );
        setProjects((prev) => prev.filter((project) => project.id !== id));
        alert("Project deleted successfully.");
      } catch (error) {
        console.error(
          "Error deleting project:",
          error.response?.data || error.message
        );
        alert("Error deleting project.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>

      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded flex items-center gap-2"
          onClick={() => {
            resetForm();
            setIsFormVisible(true);
            setIsEditing(false);
          }}
        >
          <FaPlus />
          Add New Project
        </button>
      </div>

      {isFormVisible && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2 max-w-4xl relative max-h-screen overflow-y-auto">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsFormVisible(false)}
            >
              <FaTimes size={24} />
            </button>

            <h3 className="text-lg font-semibold mb-4">
              {isEditing ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                  <label className="block text-sm font-medium">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                    placeholder="Comma-separated tags"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">
                    Description
                  </label>
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
                  <label className="block text-sm font-medium">Live Link</label>
                  <input
                    type="url"
                    name="webapp"
                    value={formData.webapp}
                    onChange={handleChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Icon Image</label>
                  <input
                    type="file"
                    name="iconImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium">Images</label>
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="border p-2 mt-1 w-full"
                  />
                </div>
              </div>
              <div className="mt-4 flex gap-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded"
                >
                  {isEditing ? "Update" : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsFormVisible(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 p-2">Icon</th>
              <th className="border border-gray-200 p-2">Title</th>
              <th className="border border-gray-200 p-2">Category</th>
              <th className="border border-gray-200 p-2">Tags</th>
              <th className="border border-gray-200 p-2">GitHub</th>
              <th className="border border-gray-200 p-2">Live Link</th>
              <th className="border border-gray-200 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="border border-gray-200 p-2">
                  <img
                    src={
                      project.iconImage
                        ? `${import.meta.env.VITE_API_BASE_URL.replace(
                            /\/api$/,
                            ""
                          )}/${project.iconImage}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={project.title}
                    className="h-12 w-auto rounded border"
                  />
                </td>
                <td className="border border-gray-200 p-2">{project.title}</td>
                <td className="border border-gray-200 p-2">
                  {project.category}
                </td>
                <td className="border border-gray-200 p-2">
                  {project.tags ? project.tags.join(", ") : "N/A"}
                </td>
                <td className="border border-gray-200 p-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      GitHub
                    </a>
                  )}
                </td>
                <td className="border border-gray-200 p-2">
                  {project.webapp ? (
                    <a
                      href={project.webapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Live Link
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="border border-gray-200 p-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
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
