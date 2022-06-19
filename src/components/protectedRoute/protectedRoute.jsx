import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const { cookie, isAuthenticated } = useSelector((state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      cookie: state.auth.cookie,
    };
  });

  if (!cookie) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={() => (isAuthenticated ? children : <Redirect to="/login" />)}
    />
  );
}
