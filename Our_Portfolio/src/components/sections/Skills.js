import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tilt } from "react-tilt";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  align-items: center;
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

const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 50px;
  justify-content: center;
`;

const Skill = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 36px;
  @media (max-width: 768px) {
    max-width: 400px;
    padding: 10px 36px;
  }
  @media (max-width: 500px) {
    max-width: 330px;
    padding: 10px 36px;
  }
`;

const SkillTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`;

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
`;

const SkillItem = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary + 80};
  border: 1px solid ${({ theme }) => theme.text_primary + 80};
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 12px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
    padding: 6px 12px;
  }
`;

const SkillImage = styled.img`
  width: 24px;
  height: 24px;
`;

// const UploadForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-top: 20px;
//   gap: 16px;
// `;

// const Input = styled.input`
//   padding: 10px;
//   border: 1px solid ${({ theme }) => theme.text_secondary};
//   border-radius: 8px;
//   width: 300px;
// `;

// const SubmitButton = styled.button`
//   padding: 10px 20px;
//   background-color: ${({ theme }) => theme.text_primary};
//   color: #fff;
//   border: none;
//   border-radius: 8px;
//   cursor: pointer;
//   &:hover {
//     background-color: ${({ theme }) => theme.text_secondary};
//   }
// `;

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);
  // const [title, setTitle] = useState("");
  // const [name, setName] = useState("");
  // const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/skills`);
        setSkills(response.data);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError(err.message);
      }
    };

    fetchSkills();
  }, []);

   return (
    <Container id="Skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc>Here are some of my skills on which I have been working on for the past 3 years.</Desc>

        {error && <p style={{ color: "red" }}>{error}</p>}

        

        <SkillsContainer>
          {skills.length > 0 &&
            skills.map((skill, index) => (
              <Tilt key={`skill-tilt-${index}`}>
                <Skill>
                  <SkillTitle>{skill.title}</SkillTitle>
                  <SkillList>
                    <SkillItem>
                      <SkillImage
                        src={`${API_URL}${skill.image}`}
                        alt={`${skill.name} logo`}
                      />
                      {skill.name}
                    </SkillItem>
                  </SkillList>
                </Skill>
              </Tilt>
            ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
