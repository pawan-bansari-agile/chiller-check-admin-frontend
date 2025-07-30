import { createGlobalStyle } from 'styled-components';

export const ResetStyle = createGlobalStyle`
* {
    margin: 0px;
    padding: 0px;
    border: none;
    outline: none;
}

html {
    scroll-behavior: smooth;
      font-family: 'Inter';
}

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.colors.light};
    font-style: normal;
    font-weight: normal;
    line-height: 1.5;
    font-family: 'Inter';
    letter-spacing: normal;
}

a {
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: none;
    }
}

button {
    outline: 0;
    cursor: pointer;

    &:hover,
    &:focus {
        outline: 0;
    }
}

h1,
h2,
h3,
h4,
h5,
h6,
strong,
b {
    font-weight: normal;
    line-height: normal;
    letter-spacing: 1px;
    font-weight: 700;
}

p {
    line-height: normal;
}

ul,
ol,
dl {
    list-style-type: none;
}

section,
header,
footer {
    display: inline-block;
    width: 100%;
}

input,
textarea,
select {
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

header {
    -webkit-appearance: none;
    -ms-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

img,
svg {
    display: inline-block;
    max-width: 100%;
    height: auto;
    border-style: none;
    vertical-align: middle;
}

::-moz-selection {
    background: ${({ theme }) => theme.colors.inkBlue};
    color: ${({ theme }) => theme.colors.white};
}

::selection {
    background: ${({ theme }) => theme.colors.inkBlue};
    color: ${({ theme }) => theme.colors.white};
}

input::placeholder{
    color: ${({ theme }) => theme.colors.placeholderColor} !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 150% !important;
}

.transition {
    -webkit-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

.title-btn{
    padding: 5px 25px;
}

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
}

.addEditHeader{
    padding: 36px 18px 5px 25px!important;

    &.userAddEditHeader{
    padding: 36px 18px 25px 25px!important;
    }
}

.setPasswordWrap{
    padding: 50px 0;
}

.ant-btn:focus{
    outline: none !important;
    box-shadow: none !important;
}
`;
