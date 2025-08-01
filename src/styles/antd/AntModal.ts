import { createGlobalStyle } from 'styled-components';

export const AntModal = createGlobalStyle`
    .ant-modal-content{
        padding: 0 !important;
    .ant-modal-header{
        padding: 16px 28px;
        border-bottom: 1px solid #F0F0F0;
        margin-bottom: 20px;
    .ant-modal-title{
        font-size: 16px;
        line-height: 100%;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.inkBlue};
    }
}
.ant-modal-close{
    top: 4px;
    color: #1D1B20;
.ant-modal-close-x {

  span {
    display: none;
  }
  &::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='64 64 896 896' focusable='false' class='' data-icon='close' width='100%' height='100%' fill='currentColor' aria-hidden='true' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M563.8 512l182.1-182.1a7.03 7.03 0 0 0 0-9.9l-60.5-60.5a7.03 7.03 0 0 0-9.9 0L493.3 441.6 311.2 259.5a7.03 7.03 0 0 0-9.9 0l-60.5 60.5a7.03 7.03 0 0 0 0 9.9L422.9 512 240.8 694.1a7.03 7.03 0 0 0 0 9.9l60.5 60.5a7.03 7.03 0 0 0 9.9 0l182.1-182.1 182.1 182.1a7.03 7.03 0 0 0 9.9 0l60.5-60.5a7.03 7.03 0 0 0 0-9.9L563.8 512z'%3E%3C/path%3E%3C/svg%3E");
  }
}

}
}

.changePasswordModal{
    .ant-modal-header{
        .modalTitleWrapper{
display: flex;
align-items: center;
gap: 10px;
            i{
                display: flex;
                width: 21px;
                height: 21px;
                border: 1px solid ${({ theme }) => theme.colors.green};
                border-radius: 50%;
                align-items: center;
                justify-content: center;
                padding: 5px;
            }
        } 
    }
    .ant-modal-body{
    p{
          font-size: 14px;
            line-height: 22px;
            font-weight: 400;
            color: ${({ theme }) => theme.colors.lightPurple};
            border-bottom: 1px solid #F0F0F0;
    padding: 1px 27px 20px 28px;
    margin-bottom: 0;
    }
    }

    .modalFooter{
        display: flex;
        justify-content: flex-end;
        padding: 16px 28px;
        flex-wrap: wrap;

        .footerBtn{
            background: ${({ theme }) => theme.colors.primary};
            color: ${({ theme }) => theme.colors.white};
            padding: 6px 35px;
            height: auto;
        }
    }
}

.logoutModal{
    .ant-modal-confirm-body{
        span{
            display: none;
        }
        .ant-modal-confirm-paragraph{
            max-width: 100%;
        }
        .logoutMessage{
.modalHeader{
    display: flex;
    align-items: center;
    gap: 10px;
        border-bottom: 1px solid #F0F0F0;
        padding: 16px 0 16px 29px;
        margin-bottom: 20px;
    span{
        display: flex;
    }
    h4{
                      font-size: 16px;
                font-weight: 600;
                line-height: 100%;
                color: ${({ theme }) => theme.colors.inkBlue};
                margin-bottom: 0;
    }
}
            .logoutContentText{
                           font-size: 14px;
                font-weight: 400;
                line-height: 22px;
                color: ${({ theme }) => theme.colors.lightPurple}; 
                padding-left: 28px;
            }
        }
    }
    .ant-modal-confirm-btns{
        border-top: 1px solid #F0F0F0;
        padding: 15px 28px;
        margin-top: 38px;
        .ant-btn-default{
            font-size: 14px;
            font-weight: 700;
            line-height: 24px;
            border: 1px solid ${({ theme }) => theme.colors.lightSkyBlue};
            padding: 6.5px 35px;
        }
        .ant-btn-primary{
            font-size: 14px;
            font-weight: 700;
            line-height: 24px;
                        padding: 6.5px 35px;

        }
    }
}

.InactiveModalWrap{
    .modalTitleWrapper{
       display: flex;
       flex-direction: row;;
       align-items: center;
    i{
        margin-right: 10px;
        width: 21px;
        height: 21px;
        span{
                    width: 100%;
        height: 100%;
        }
        svg{
               width: 100%;
        height: 100%;
        }
    }
    .main-title{
           font-size: 16px;
            font-weight: 600;
            line-height: 100%;
            color: ${({ theme }) => theme.colors.inkBlue};
    }
   }
   .ant-modal-body{
    p{
              font-size: 14px;
            font-weight: 400;
            line-height: 22px;
            color: ${({ theme }) => theme.colors.lightPurple};
            padding: 0 28px;
            margin-bottom: 0;
    }
    .updateCount{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 52px 0;

        h2{
            font-size: 28px;
            font-weight: 600;
            line-height: 22px;
            color: ${({ theme }) => theme.colors.inkBlue};
            margin-bottom: 5px;
        }

        p{
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            color: ${({ theme }) => theme.colors.lightPurple};
            margin-bottom: 0px;
        }
    }

    .electricityField{
        padding: 0 28px;
        margin-bottom: 36px;
    }

    .modalFooter{
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        flex-wrap: wrap;
        border-top: 1px solid #F0F0F0;
        padding: 15px 28px 16px 0;
        margin-top: 20px;
               .ant-btn-default{
            font-size: 14px;
            font-weight: 700;
            line-height: 24px;
            border: 1px solid ${({ theme }) => theme.colors.lightSkyBlue};
            padding: 6.5px 35px;
        }

        .footerBtn{
            background: ${({ theme }) => theme.colors.primary};
            color: ${({ theme }) => theme.colors.white};
        }
        .unassignBtn{
            background: ${({ theme }) => theme.colors.danger};
            color: ${({ theme }) => theme.colors.white};
        }
    }
   }
}

  @media only screen and (max-width: ${({ theme }) => theme.device.sm}) {
.active-inactive-user-modal{
    .modalFooter{
        .unassignBtn{
            width: 91%;
        }
        button:not(.unassignBtn){
            width: 44%;
        }
    }
}}

`;
