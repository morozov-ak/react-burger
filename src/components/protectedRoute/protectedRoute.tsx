import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { TStore } from "../../services/reducers";
import { FC } from "react";
import { useSelector } from "../../services/hooks";

export const ProtectedRoute:FC<RouteProps> = ({ children, ...rest }) => {
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
