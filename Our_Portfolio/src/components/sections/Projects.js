import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProjectCard from "../cards/ProjectCard";
import Button from "@mui/material/Button";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  padding: 50px;
  background-color: ${({ theme }) => theme.background};
  min-height: 100vh;
`;

const Loading = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-top: 50px;
`;

const Error = styled.div`
  font-size: 16px;
  color: red;
  text-align: center;
  margin-top: 50px;
`;

const NoProjects = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-top: 50px;
`;

const MenuBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const MenuButton = styled(Button)`
  background-color: ${({ active, theme }) =>
    active ? theme.primary : theme.background}; /* Active button has primary background, inactive is transparent */
  color: ${({ active, theme }) =>
    active ? theme.white : theme.text_primary}; /* Active button has white text, inactive has text_primary */
  border: ${({ active, theme }) =>
    active ? `2px solid ${theme.primary}` : "2px solid transparent"}; /* Border for active button */
  &:hover {
    background-color: ${({ active, theme }) =>
      active ? theme.primaryHover : "rgba(0, 0, 0, 0.05)"}; /* Subtle hover effect for inactive buttons */
  }
  padding: 8px 20px;
  border-radius: 5px;
  text-transform: capitalize;
  font-weight: 500;
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`);
        if (!response.ok) throw new Error("Failed to fetch projects.");
        const data = await response.json();

        // Ensure data is an array and set projects
        const projectList = Array.isArray(data) ? data : data.data || [];
        setProjects(projectList);

        // Extract unique categories
        const uniqueCategories = [
          "All",
          ...new Set(projectList.map((project) => project.category)),
        ];
        setCategories(uniqueCategories);

        // Set initial filtered projects to all projects
        setFilteredProjects(projectList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Update filtered projects whenever a category is selected
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProjects(projects); // Show all projects
    } else {
      const filtered = projects.filter((project) => project.category === category);
      setFilteredProjects(filtered); // Filter by category
    }
  };

  if (loading) return <Loading>Loading projects...</Loading>;
  if (error) return <Error>Error: {error}</Error>;

  return (
    <>
      {/* Menu Bar */}
      <MenuBar>
        {categories.map((category) => (
          <MenuButton
            key={category}
            active={selectedCategory === category ? 1 : 0} // Dynamically set active state
            onClick={() => handleCategoryClick(category)}
            variant="contained"
          >
            {category}
          </MenuButton>
        ))}
      </MenuBar>

      {/* Projects Container */}
      <Container>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <NoProjects>No projects available</NoProjects>
        )}
      </Container>
    </>
  );
};

export default Projects;
