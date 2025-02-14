import React, { useEffect, useState } from "react";
import axios from "axios";
import { VerticalTimeline } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import styled from "styled-components";
import EducationCard from "../cards/EducationCard";  // Ensure this path is correct
import EarthCanvas from "../canvas/Earth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const Education = () => {
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch education data from the API
  useEffect(() => {
    const fetchEducationData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/education`);
        setEducationData(response.data); // Assuming the response is an array of education objects
      } catch (err) {
        setError("Failed to fetch education data.");
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, []);

  return (
    <Container id="Education">
      <Wrapper>
        <Title>Education</Title>
        <Desc>
          My education has been a journey of self-discovery and growth. Below are the details:
        </Desc>

        {/* Handle Loading and Error States */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <VerticalTimeline>
            {educationData.map((education, index) => (
              <EducationCard key={`education-${index}`} education={education} />
            ))}
          </VerticalTimeline>
        )}

        <EarthCanvas />
      </Wrapper>
    </Container>
  );
};

export default Education;
