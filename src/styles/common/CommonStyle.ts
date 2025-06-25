import { createGlobalStyle } from 'styled-components';

import { boxShadow } from './Mixin';

export const CommonStyle = createGlobalStyle`

.container-fluid {
    width: 100%;
    max-width: 100%;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;
}

.container {
    width: 100%;
    max-width: 1230px;
    padding-left: 15px;
    padding-right: 15px;
    margin: 0 auto;

    &.lg {
        width: 1290px;
    }

    &.md {
        width: 908px;
    }
}

.shadow-paper {
	height: 100%;
	background: ${({ theme }) => theme.colors.white};
	padding: 20px;
	border-radius: 10px;
    ${boxShadow('10px 10px 20px 5px rgba(0, 0, 0, 0.05)')}

	&.auto-height {
		height: auto;
	}

	.shadow-paper-scroll {
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
		margin: 0 -20px;
		padding: 0 20px;
	}

	+.shadow-paper {
		margin-top: 20px;
	}

    &.no-bg{
        background-color: transparent;
    }

    &.pad-sm{
        padding: 10px 20px;
    }

    &.pad-md{
        padding: 15px 20px;
    }

	&.no-pad {
		padding: 0;
	}

	.heading-row {
		padding: 20px 0;
	}
}

.tableField{
    border: 1px solid ${({ theme }) => theme.colors.lightSkyBlue};
    border-radius: 5px;
    padding: 10px 20px;
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: ${({ theme }) => theme.colors.inkBlue};

    &::placeholder{
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: ${({ theme }) => theme.colors.placeholderColor};
    }

    &:focus-within{
        border-color: ${({ theme }) => theme.colors.primary};
    }
}

.tabSelectField{
    width: 100%;
    .ant-select-selector{
        border-radius: 5px !important;
        .ant-select-selection-item{
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        color: ${({ theme }) => theme.colors.inkBlue};
        text-align: left;
        }
    }

    &.tabSelectField{
        width: 120px !important;

        &.unitsFields{
        width: 135px !important;
        }
    }
}

.title-cancel-btn{
    border: 1px solid ${({ theme }) => theme.colors.lightSkyBlue};
    background: transparent;
    padding: 5px 25px !important;
    height: auto !important;
    span{
        line-height: 22px !important;
    }
    &:hover{
        background: ${({ theme }) => theme.colors.primary} !important;
        color: ${({ theme }) => theme.colors.white} !important;
    }
}

.bgRed{
    border: 1px solid ${({ theme }) => theme.colors.danger};
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.lightOrange};
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.bgYellow{
    border: 1px solid ${({ theme }) => theme.colors.yellow};
    border-radius: 10px;
    background: ${({ theme }) => theme.colors.lightYellow};
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

  .switchLabelWrap{
    display: flex;
    flex-direction: column;
    .switchLabel{
          color: #040C2B;
    font-size: 14px;
    line-height: 22px;
    font-weight: 400;
    margin-bottom: 4px;
    }
    .esteriskSign{
        color: #F04924;
        margin-right: 4px;
        font-size: 16px;
    }
    button{
        width: 60px;
    }
  }
`;
