import React, { useRef, useState } from "react";
import styled from "styled-components";

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
  color: ${({ theme }) => theme.text_primary || "#000"};
  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary || "#666"};
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: rgba(17, 25, 40, 0.83);
  border: 1px solid rgba(255, 255, 255, 0.125);
  padding: 32px;
  border-radius: 12px;
  box-shadow: rgba(23, 92, 230, 0.1) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 28px;
  margin-bottom: 6px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary || "#000"};
`;

const ContactInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary || "#ccc"};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary || "#000"};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary || "#5e9ed6"};
  }
`;

const ContactInputMessage = styled.textarea`
  flex: 1;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary || "#ccc"};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary || "#000"};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.primary || "#5e9ed6"};
  }
`;

const ContactButton = styled.input`
  width: 100%;
  text-decoration: none;
  text-align: center;
  background: hsla(271, 100%, 50%, 1);
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary || "#fff"};
  font-size: 18px;
  font-weight: 600;
`;

const ResponseMessage = styled.div`
  font-size: 16px;
  color: ${({ isError }) => (isError ? "red" : "green")};
  text-align: center;
  margin-top: 10px;
`;

const LoadingMessage = styled.div`
  font-size: 16px;
  color: blue;
  text-align: center;
  margin-top: 10px;
`;

const Contact = () => {
  const form = useRef();
  const [responseMessage, setResponseMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(form.current);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setResponseMessage("Message sent successfully!");
        setIsError(false);
        form.current.reset();
      } else {
        const errorData = await response.json();
        setResponseMessage(errorData.error || "Failed to send message.");
        setIsError(true);
      }
    } catch (error) {
      setResponseMessage("An error occurred. Please try again.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container id="contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Name" name="name" required />
          <ContactInput placeholder="Your Email" name="email" type="email" required />
          <ContactInputMessage placeholder="Message" name="message" rows={4} required />
          <ContactButton type="submit" value="Send" />
          {loading && <LoadingMessage>Submitting...</LoadingMessage>}
          {responseMessage && (
            <ResponseMessage isError={isError}>{responseMessage}</ResponseMessage>
          )}
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;
