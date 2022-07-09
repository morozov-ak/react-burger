import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { TStore } from "../../services/reducers";
import { FC } from "react";

export const ProtectedRoute:FC<RouteProps> = ({ children, ...rest }) => {
  const location = useLocation();

  const { isLoaded, isAuthenticated } = useSelector((state:TStore) => {
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
