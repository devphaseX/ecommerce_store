import { Navigate, Outlet } from 'react-router-dom';
import { useTypedSelector } from '../../store/setup';

const AuthGrantRoute = () => {
  const authenicated = useTypedSelector(
    (state) => !!state.clientInfo.user && !state.clientInfo.logout
  );

  if (!authenicated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export { AuthGrantRoute };
