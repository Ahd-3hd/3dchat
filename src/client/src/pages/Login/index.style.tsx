import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 50%;
  max-width: 600px;
  padding: 1rem;
  background: white;
  box-shadow: 0 0 10px rgb(236, 236, 236);
  border-radius: 0.4rem;
`;
export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;
export const Label = styled.label`
  font-size: 0.85rem;
  color: #333333;
  font-weight: bold;
`;
export const InputField = styled.input`
  margin: 0.5rem 0;
  padding: 0.7rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0.3rem;
`;

export const Button = styled.button`
  width: 100%;
  padding: 0.7rem;
  background: #2c2c2c;
  border: none;
  color: #ffffff;
  font-size: 1.2rem;
  border-radius: 0.3rem;
  cursor: pointer;
`;
