import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Tilt } from "react-tilt";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const normalizeURL = (base, path) => {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
};

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
  gap: 50px;
  justify-content: center;
  margin-top: 20px;
`;

const SkillCard = styled.div`
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
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary};
`;

const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
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

const Skills = () => {
  const [skillsByCategory, setSkillsByCategory] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriesAndSkills = async () => {
      try {
        // Fetch categories
        const categoryResponse = await axios.get(`${API_URL}/api/skill-categories`);
        const categories = categoryResponse.data;

        // Fetch skills
        const skillResponse = await axios.get(`${API_URL}/api/skills`);
        const skills = skillResponse.data;

        // Map skills to their categories
        const groupedSkills = {};
        categories.forEach((category) => {
          groupedSkills[category.name] = skills.filter((skill) => skill.categoryId === category.id);
        });

        setSkillsByCategory(groupedSkills);
      } catch (err) {
        console.error("Error fetching categories or skills:", err);
        setError("Failed to fetch categories or skills. Please try again later.");
      }
    };

    fetchCategoriesAndSkills();
  }, []);

  return (
    <Container id="Skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc>Here are the skills grouped into their respective categories.</Desc>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <SkillsContainer>
          {Object.keys(skillsByCategory).length > 0 ? (
            Object.keys(skillsByCategory).map((category, index) => (
              <Tilt key={`category-tilt-${index}`}>
                <SkillCard>
                  <SkillTitle>{category}</SkillTitle>
                  <SkillList>
                    {skillsByCategory[category].length > 0 ? (
                      skillsByCategory[category].map((skill, skillIndex) => (
                        <SkillItem key={`skill-item-${skillIndex}`}>
                          {skill.image && (
                            <SkillImage
                              src={normalizeURL(API_URL, skill.image)}
                              alt={`${skill.title} logo`}
                            />
                          )}
                          {skill.title}
                        </SkillItem>
                      ))
                    ) : (
                      <p style={{ color: "gray" }}>No skills available in this category.</p>
                    )}
                  </SkillList>
                </SkillCard>
              </Tilt>
            ))
          ) : (
            <p style={{ color: "gray" }}>No skills available at the moment.</p>
          )}
        </SkillsContainer>
      </Wrapper>
    </Container>
  );
};

export default Skills;
