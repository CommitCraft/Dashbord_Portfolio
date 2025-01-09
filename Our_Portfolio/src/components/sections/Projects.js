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
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const Title = styled.div`
  font-size: 52px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;
const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
  }
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
    active ? theme.primary : theme.background};
  color: ${({ active, theme }) =>
    active ? theme.white : theme.text_primary};
  border: ${({ active, theme }) =>
    active ? `2px solid ${theme.primary}` : "2px solid transparent"};
  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
  padding: 8px 20px;
  border-radius: 5px;
  text-transform: capitalize;
  font-weight: 500;
  transition: all 0.3s ease-in-out; /* Smooth hover effect */
`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`);
        if (!response.ok) throw new Error("Failed to fetch projects.");

        const data = await response.json();
        const projectList = Array.isArray(data) ? data : data.data || [];
        setProjects(projectList);

        const uniqueCategories = [
          "All",
          ...new Set(projectList.map((project) => project.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  if (loading) return <Loading>Loading projects...</Loading>;
  if (error) return <Error>Error: {error}</Error>;

  return (
    <>
    
        <Title>Projects</Title>
        <Desc
          style={{
            marginBottom: "40px",
          }}
        >
          I have worked on a wide range of projects. From web apps to android
          apps. Here are some of my projects.
        </Desc>
      {/* Menu Bar */}
      <MenuBar>
        {categories.map((category) => (
          <MenuButton
            key={category}
            active={selectedCategory === category ? 1 : 0}
            onClick={() => handleCategoryClick(category)}
            variant="contained"
            aria-label={`Filter by ${category}`}
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
