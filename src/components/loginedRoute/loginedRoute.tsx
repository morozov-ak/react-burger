import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";
import { TStore } from "../../services/reducers";
import { FC } from "react";



export const LoginedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isLoaded, isAuthenticated } = useSelector((state:TStore) => {
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
    >
      {!isAuthenticated ? children : <Redirect to="/" />}
    </Route>
  );
}
