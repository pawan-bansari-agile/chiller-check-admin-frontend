import styled from 'styled-components';

export const Wrapper = styled.div`
  .cmsCard {
    padding: 24px 32px;
    .ck-editor__main p {
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: ${({ theme }) => theme.colors.inkBlue};
    }
  }

  .cmsContent {
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
    color: ${({ theme }) => theme.colors.inkBlue};
    padding: 24px 32px;
  }

  .buttonCol {
    margin: 0 0px 20px auto;
  }

  .editButton {
    width: 100%;
    text-align: right;
    padding: 0 32px;
  }
`;
