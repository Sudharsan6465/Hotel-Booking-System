import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminRoute() {

  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">

        <div className="text-center">

          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-border border-t-aubergine" />

          <p className="mt-5 text-[10px] tracking-[0.25em] text-muted">
            LOADING HAVEN
          </p>

        </div>

      </div>
    );

  }

  if (!isAuthenticated || !user) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );

  }

  if (user.role !== "ADMIN") {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );

  }

  return <Outlet />;
}

export default AdminRoute;