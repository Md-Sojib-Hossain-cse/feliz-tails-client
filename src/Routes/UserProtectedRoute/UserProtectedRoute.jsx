import useAuth from "@/hooks/useAuth";
import LoadingPage from "@/Pages/Shared/LoadingPage/LoadingPage";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
    const { loading, user } = useAuth();
    const location = useLocation();

    if (loading) return <LoadingPage></LoadingPage>
    if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace={true}></Navigate>
    return (
        <>
            {children}
        </>
    );
};

UserProtectedRoute.propTypes = {
    children: PropTypes.node,
}

export default UserProtectedRoute;