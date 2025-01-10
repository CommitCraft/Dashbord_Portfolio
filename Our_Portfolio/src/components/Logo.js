import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  text-align: center;
`;

const FullNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    display: none; /* Hide full name on smaller screens */
  }
`;

const InitialsContainer = styled.div`
  display: none; /* Hide initials on larger screens */
  position: relative;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FullName = styled.h1`
  font-family: "Vivaldi", serif;
  font-size: 3vw;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(90deg, #ff4500, #ff7f50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const FullNameLine = styled.div`
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, #ff4500, #ff7f50);
  margin-top: 8px;
  border-radius: 5px;
`;

const InitialsCircle = styled.div`
  width: 30px; /* Equal width and height for a perfect circle */
  height: 30px;
  border-radius: 10%; /* Makes it a perfect circle */
  background: linear-gradient(135deg, #fff, #fff);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(255, 69, 0, 0.8), inset 0 0 5px rgba(255, 69, 0, 0.5);
`;

const InitialsText = styled.h1`
  font-family: "Vivaldi", serif;
  font-size: 5vw;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(90deg, #ff4500, #ff7f50);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const CircleDecoration = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 10%; /* Ensures the outer decoration is circular */
  border: 2px solid rgba(255, 69, 0, 0.5);
  animation: rotate 5s linear infinite;

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Logo = () => {
  return (
    <LogoContainer>
      {/* Desktop Full Name Design */}
      <FullNameContainer>
        <FullName>Vipin Kushwaha</FullName>
        <FullNameLine />
      </FullNameContainer>

      {/* Mobile Initials Design */}
      <InitialsContainer>
        <CircleDecoration />
        <InitialsCircle>
          <InitialsText>VK</InitialsText>
          <FullNameLine />
        </InitialsCircle>
      </InitialsContainer>
    </LogoContainer>
  );
};

export default Logo;
