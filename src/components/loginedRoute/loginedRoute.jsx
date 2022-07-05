import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export function LoginedRoute({ children, ...rest }) {
  const { isLoaded, isAuthenticated } = useSelector((state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      isLoaded: state.auth.isLoaded,
    };
  });

  if (!isLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={() => (!isAuthenticated ? children : <Redirect to="/" />)}
    />
  );
}
