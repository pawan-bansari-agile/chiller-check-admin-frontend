import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 50%;
  .CardWithTitleWrap {
    background: #fff;
    border-radius: 16px;
  }
  .cardHeaderTitle {
    border-bottom: 1px solid #f4f4f4;
    padding: 25px 32px 15px;
    h2 {
      font-size: 16px;
      font-weight: 600;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.primary};
      margin-bottom: 0;
    }
  }
`;
