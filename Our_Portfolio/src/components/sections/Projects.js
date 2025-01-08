import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProjectCard from "../cards/ProjectCard";

// Styled Container for Projects
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: center;
  padding: 50px;
  background-color: ${({ theme }) => theme.background};
  min-height: auto;
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

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/projects`);
        if (!response.ok) throw new Error("Failed to fetch projects.");
        const data = await response.json();

        // Ensure data is an array
        setProjects(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <Loading>Loading projects...</Loading>;
  if (error) return <Error>Error: {error}</Error>;

  return (
    <Container>
      {projects.length > 0 ? (
        projects.map((project) => <ProjectCard key={project.id} project={project} />)
      ) : (
        <NoProjects>No projects available</NoProjects>
      )}
    </Container>
  );
};

export default Projects;
