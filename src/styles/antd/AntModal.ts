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
    padding: 21px 27px 30px 28px;
    margin-bottom: 0;
    }
    }

    .modalFooter{
        display: flex;
        justify-content: flex-end;
        padding: 16px 28px;

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

`;
