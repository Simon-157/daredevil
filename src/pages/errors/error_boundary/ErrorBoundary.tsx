import { Component, ErrorInfo, ReactNode } from "react";

// components
import ErrorBoundarySvg from "./ErrorBoundarySvg";

// styles
import errorStyles from "../Errors.module.css";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    console.log(errorInfo);
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div className={errorStyles.error__wrapper}>
          <div>
            <ErrorBoundarySvg />
            <br />
            <strong>Oops! Something went wrong, we are fixing it</strong>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
