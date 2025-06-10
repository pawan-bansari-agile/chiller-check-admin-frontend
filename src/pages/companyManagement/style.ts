import styled from 'styled-components';

export const Wrapper = styled.div`
  /* add company */
  .company-details-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 22px 20px 22px;
    margin-bottom: 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.body};

    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin-bottom: 0;
    }
  }

  .add-company-form {
    padding: 0 22px;
  }

  /* view company */
  .viewHeader {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.body};
    margin-bottom: 20px;
    padding: 0 32px 20px;

    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin-bottom: 0;
      margin-right: 20px;
    }

    .statusBedge {
      font-size: 12px;
      font-weight: 400;
      line-height: 17px;
      color: ${({ theme }) => theme.colors.white};
      padding: 1px 13px;
      border-radius: 20px;
      &.active {
        background: ${({ theme }) => theme.colors.green};
      }
    }
  }

  ul.company-info-container {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    color: #2c2c2c;
    padding: 0px 32px 22px;
    margin: 0;
    li {
      width: 23%;
      display: flex;
      flex-direction: column;
      gap: 2px;
      &.address {
        width: 100%;
        max-width: 600px;
      }

      .info-item-wrap {
        display: flex;
        align-items: center;
        .icon {
          color: ${({ theme }) => theme.colors.inkBlue};
          font-size: 12px;
          margin-right: 10px;
        }
        .label {
          font-size: 14px;
          font-weight: 600;
          color: ${({ theme }) => theme.colors.inkBlue};
          line-height: 22px;
        }
      }
      .value {
        font-size: 14px;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.lightPurple};
        line-height: 20px;
      }
    }
  }
`;
