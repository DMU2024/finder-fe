import { Navigate } from "react-router-dom";

import useAuthStore from "../stores/auth";

interface Props {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: Props) => {
  const { userId } = useAuthStore();

  if (!userId) {
    return <Navigate replace={true} to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
