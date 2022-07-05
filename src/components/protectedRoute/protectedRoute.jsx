import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const location = useLocation();

  const { isLoaded, isAuthenticated } = useSelector((state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      isLoaded: state.auth.isLoaded,
    };
  });

  if (!isLoaded) {
    return <></>;
  }

  return (
    <>
      {isAuthenticated && isLoaded ? (
        <Route {...rest}>{children}</Route>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      )}
    </>
  );
}
