import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";

// Styled Card
const Card = styled.div`
  width: 330px;
  background-color: ${({ theme }) => theme.card};
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

// Styled Image
const Image = styled.img`
  width: 100%;
  height: 30vh;
  border-radius: 10px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.2);
`;

// Styled Title
const Title = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
  margin: 0;
`;

// Styled Description
const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.text_secondary};
  line-height: 1.5;
  margin: 0;
`;

// Styled Buttons Container
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const ProjectCard = ({ project }) => {
  // Construct the image URL directly from the project data
  const imageUrl = project.iconImage
    ? `${process.env.REACT_APP_API_URL.replace('/api', '')}/${project.iconImage}`
    : null;

  return (
    <Card>
      {imageUrl ? (
        <Image src={imageUrl} alt={project.title || "Project Image"} />
      ) : (
        <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
          Image not available
        </div>
      )}
      <Title>{project.title || "Untitled Project"}</Title>
      <Description>{project.description || "No description available."}</Description>
      <Buttons>
        {project.github && (
          <Button
            href={project.github}
            target="_blank"
            variant="outlined"
            color="primary"
          >
            View Code
          </Button>
        )}
        {project.webapp && (
          <Button
            href={project.webapp}
            target="_blank"
            variant="contained"
            color="primary"
          >
            View Demo
          </Button>
        )}
      </Buttons>
    </Card>
  );
};

export default ProjectCard;
