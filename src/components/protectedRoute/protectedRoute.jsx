import { Route, Redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCookie } from "../../utils/getCoockie";

export function ProtectedRoute({ children, ...rest }) {
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    const cookie = getCookie("accessToken");

    if (cookie) {
      setUserLoaded(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Route
      {...rest}
      render={() => (isUserLoaded ? children : <Redirect to="/login" />)}
    />
  );
}
