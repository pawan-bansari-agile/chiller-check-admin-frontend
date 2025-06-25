import styled from 'styled-components';

export const Wrapper = styled.div`
  /* listing */
  .facilityContentHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 22px 22px;

    .searchFacility {
      max-width: 330px;
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      color: ${({ theme }) => theme.colors.black};
      border: 1px solid ${({ theme }) => theme.colors.shadowBlue};
      &:focus-within {
        box-shadow: none;
        border-color: ${({ theme }) => theme.colors.primary};
      }
      &::placeholder {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
      }
    }
  }

  /* add-edit */
  .shadowPaperWrap {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .add-facility-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 22px;
  }

  .addFacilityHeader {
    padding: 6px 0 20px 22px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.body};
    margin-bottom: 20px;
    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin-bottom: 0;
    }
  }

  .removeBtn {
    background: none;
    font-size: 12px;
    line-height: 17px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.danger};
    &.disabled {
      color: ${({ theme }) => theme.colors.disabledColor};
      cursor: not-allowed;
    }
  }

  .addChillerBtn {
    width: calc(100% - 44px);
    color: ${({ theme }) => theme.colors.primary};
    background: transparent;
    border: 1px dashed ${({ theme }) => theme.colors.primary};
    padding: 10px 0px;
    border-radius: 5px;
    cursor: 'pointer';
    margin: 10px 22px;
  }

  /* view */
  .requiredStar {
    color: #ff4d4f;
    font-size: 16px;
    margin: 0 4px 0 0;
    padding-top: 4px;
  }
  .viewFacilityHeader {
    padding: 6px 0 20px 32px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.body};
    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin-bottom: 0;
    }
  }

  .last-entry-cell {
    .entryName {
      font-weight: 600;
    }
  }

  .company-info-container {
    padding: 20px 32px;
    display: flex;
    flex-wrap: wrap;
    gap: 40px 0;

    li {
      width: 25%;
    }

    .address {
      width: 50%;
    }

    svg {
      fill: ${({ theme }) => theme.colors.inkBlue};
    }
  }

  .viewChillerFacilityHeader {
    h2 {
      font-size: 18px;
      font-weight: 600;
      line-height: 28px;
      color: ${({ theme }) => theme.colors.inkBlue};
      margin: 6px 22px 20px;
    }
  }

  .chillerNameWrap {
    text-align: left;
    .chillerName {
      color: ${({ theme }) => theme.colors.primary};
      border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
      margin-left: 22px;
    }
    span {
      display: block;
      text-align: center;
    }
  }

  .viewButtonWrap {
    display: flex;
    gap: 10px;
  }

  .altitudeRow {
    align-items: flex-start;

    .selectUnitFacility {
      margin-top: 26px;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.md}) {
    ul.company-info-container {
      li {
        width: 48%;
      }
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.sm}) {
    .facilityContentHeader {
      flex-direction: column;
      align-items: flex-start;
      gap: 15px;
    }

    .add-facility-form {
      padding: 15px;
    }
  }

  @media only screen and (max-width: ${({ theme }) => theme.device.xs}) {
    ul.company-info-container {
      li {
        width: 100%;
      }
    }
  }
`;
