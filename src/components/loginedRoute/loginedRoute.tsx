import { Route, Redirect, RouteProps } from "react-router-dom";
import { TStore } from "../../services/reducers";
import { FC } from "react";
import { useSelector } from "../../services/hooks";



export const LoginedRoute: FC<RouteProps> = ({ children, ...rest }) => {
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
    >
      {!isAuthenticated ? children : <Redirect to="/" />}
    </Route>
  );
}
