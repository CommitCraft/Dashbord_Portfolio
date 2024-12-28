import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
import HeroBgAnimation from "../HeroBgAnimation";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
} from "../../utils/motion";
import StarCanvas from "../canvas/Stars";
import axios from "axios";

const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 10px 30px;
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 95%, 0 100%);
  
  @media (max-width: 960px) {
    padding: 66px 16px;
    flex-direction: column;
  }

  @media (max-width: 640px) {
    padding: 32px 16px;
  }
`;

const HeroInnerContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    gap: 6px;
    flex-direction: column;
    align-items: center;
  }
`;

const HeroRightContainer = styled.div`
  width: 100%;
  order: 2;
  display: flex;
  justify-content: end;

  @media (max-width: 960px) {
    order: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) {
    margin-bottom: 30px;
  }
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 50px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;
  
  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.text_primary};
  line-height: 68px;

  @media (max-width: 960px) {
    text-align: center;
  }

  @media (max-width: 960px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

const Span = styled.div`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
`;

const SubTitle = styled.div`
  font-size: 14px;
  line-height: 32px;
  margin-bottom: 42px;
  color: ${({ theme }) => theme.text_primary + 95};

  @media (max-width: 960px) {
    text-align: center;
  }
`;

const ResumeButton = styled.a`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;
  width: 95%;
  max-width: 300px;
  text-align: center;
  padding: 16px 0;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1) 0%, hsla(294, 100%, 50%, 1) 100%);
  box-shadow: 20px 20px 60px #1f2634, -20px -20px 60px #1f2634;
  border-radius: 50px;
  font-weight: 600;
  font-size: 20px;

  &:hover {
    transform: scale(1.05);
    transition: all 0.4s ease-in-out;
    box-shadow: 20px 20px 60px #1f2634;
    filter: brightness(1);
  }

  @media (max-width: 640px) {
    padding: 12px 0;
    font-size: 18px;
  }
  color: white;
`;

const Img = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  max-width: 400px;
  max-height: 400px;
  border: 2px solid ${({ theme }) => theme.primary};

  @media (max-width: 640px) {
    max-width: 280px;
    max-height: 280px;
  }
`;

const HeroBg = styled.div`
  position: absolute;
  display: flex;
  justify-content: end;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 100%;
  height: 100%;
  max-width: 1360px;
  overflow: hidden;
  padding: 0 30px;

  @media (max-width: 960px) {
    justify-content: center;
    padding: 0 0;
  }
`;

const Hero = () => {
  const [bioData, setBioData] = useState(null);

  useEffect(() => {
    const fetchBioData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/about`);

        if (response.data && response.data.length > 0) {
          let { name, roles, description, resume, image } = response.data[0];

          if (typeof roles === "string") {
            try {
              roles = JSON.parse(roles);
            } catch (error) {
              console.error("Error parsing roles JSON:", error);
            }
          }

          setBioData({ name, roles, description, resume, image });
        } else {
          console.error("No data returned from API.");
        }
      } catch (error) {
        console.error("Error fetching bio data:", error);
      }
    };

    fetchBioData();
  }, []);

  if (!bioData) {
    return <p>Loading...</p>;
  }

  return (
    <div id="About">
      <HeroContainer>
        <HeroBg>
          <StarCanvas />
          <HeroBgAnimation />
        </HeroBg>
        <motion.div {...headContainerAnimation}>
          <HeroInnerContainer>
            <HeroLeftContainer>
              <motion.div {...headTextAnimation}>
                <Title>
                  Hi, I am <br /> {bioData.name}
                </Title>
                <TextLoop>
                  I am a
                  <Span>
                    <Typewriter
                      options={{
                        strings: bioData.roles,
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </Span>
                </TextLoop>
              </motion.div>

              <motion.div {...headContentAnimation}>
                <SubTitle>{bioData.description}</SubTitle>
              </motion.div>

              <ResumeButton
                href={bioData.resume}
                target="_blank"
                aria-label="Open Resume in a new tab"
              >
                Check Resume
              </ResumeButton>
            </HeroLeftContainer>

            <HeroRightContainer>
              <motion.div {...headContentAnimation}>
                <Tilt>
                  <Img src={`${process.env.REACT_APP_API_URL}${bioData.image}`} alt={`Portrait of ${bioData.name}`} />
                </Tilt>
              </motion.div>
            </HeroRightContainer>
          </HeroInnerContainer>
        </motion.div>
      </HeroContainer>
    </div>
  );
};

export default Hero;
