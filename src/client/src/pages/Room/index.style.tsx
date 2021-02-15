import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const UrlInput = styled.input`
  padding: 1rem;
  min-width: 400px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 0.3rem;
  font-size: 0.8rem;
  font-weight: bold;
  color: #333333;
  outline: none;
  ::selection {
    background: #333333;
    color: #fff;
  }
`;
export const CopyButton = styled.button`
  padding: 0.7rem;
  background: #2c2c2c;
  border: none;
  color: #ffffff;
  font-size: 1.2rem;
  border-radius: 0.3rem;
  cursor: pointer;
  margin-left: 0.3rem;
`;
export const InputContainer = styled.div`
  display: flex;
`;
export const FormParagraph = styled.p`
  max-width: 50ch;
  text-align: center;
  line-height: 160%;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.9px;
  color: #333333;
`;

export const Span = styled.span`
  color: #666666;
  font-weight: 400;
  font-size: 0.7rem;
`;
