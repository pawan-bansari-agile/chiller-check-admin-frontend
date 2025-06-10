import { Component, ErrorInfo, ReactNode } from 'react';

import { toAbsoluteUrl } from '@/shared/utils/functions';

import * as Styled from './style';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('ErrorBoundary caught an error', error, info);
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <Styled.ErrorContainer>
          <Styled.ErrorImage
            src={`${toAbsoluteUrl('/icons/error.png')}`}
            alt="Error Illustration"
          />
          <Styled.ErrorTitle>Oops! Something went wrong :(</Styled.ErrorTitle>
          <Styled.ErrorMessage>Try to refresh the page</Styled.ErrorMessage>
          <Styled.RefreshButton onClick={this.handleRefresh}>Refresh</Styled.RefreshButton>
        </Styled.ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
