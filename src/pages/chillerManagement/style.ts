import styled from 'styled-components';

export const Wrapper = styled.div`
  /* list */
  .chillerButtonWrap {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  .chillerContentHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 22px 22px;

    .dropdownWrap {
      display: flex;
      gap: 10px;
    }

    .searchChiller {
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

  .loss-red {
    background-color: #fddede;
    border: 1px solid #eb5757;
    border-radius: 12px;
    text-align: center;
    padding: 4px 8px;
  }

  .loss-yellow {
    background-color: #fef3c7;
    border: 1px solid #facc15;
    border-radius: 12px;
    text-align: center;
    padding: 4px 8px;
  }
`;
