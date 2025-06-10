import { createGlobalStyle } from 'styled-components';

export const TypographyStyle = createGlobalStyle`
/* Text Alignment */
.text-center {
    text-align: center;
}

.text-left {
    text-align: left;
}

.text-right {
    text-align: right;
}

/* Text Colors */
.text-success {
	color: ${({ theme }) => theme.colors.success};
}

.text-danger {
	color: ${({ theme }) => theme.colors.danger};
}

.text-warning {
	color: ${({ theme }) => theme.colors.warning};
}

.text-info {
	color: ${({ theme }) => theme.colors.info};
}

`;
