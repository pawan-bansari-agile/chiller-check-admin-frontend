import styled from 'styled-components';

export const Wrapper = styled.li`
  .titleWrap {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 2px;
    h2 {
      font-size: 14px;
      font-weight: 600;
      line-height: 22px;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin-bottom: 0;
    }
  }
  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.lightPurple};
    margin-bottom: 0;
  }
`;
