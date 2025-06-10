import styled from 'styled-components';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f5f5f5;
  padding: 20px;
`;

export const ErrorImage = styled.img`
  width: 300px;
  margin-bottom: 20px;
`;

export const ErrorTitle = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
`;

export const ErrorMessage = styled.p`
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 30px;
`;

export const RefreshButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #071447;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #165ca8;
  }
`;
