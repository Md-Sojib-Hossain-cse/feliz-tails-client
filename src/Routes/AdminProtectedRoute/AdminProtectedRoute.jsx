import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import LoadingPage from "@/Pages/Shared/LoadingPage/LoadingPage";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({children}) => {
    const {user , loading} = useAuth();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();

    const {data = "" , isLoading } = useQuery({
        queryKey : ['user-role' , user?.email ],
        queryFn : async() => {
            const res = await axiosPublic.get(`/user/${user?.email}`)
            return res.data;
        }
    })

    if(loading || isLoading) return <LoadingPage></LoadingPage>

    if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace={true}></Navigate>

    if(data?.role !== "Admin") return <Navigate to="/dashboard" state={{ from: location.pathname }} replace={true}></Navigate> ;

    return children
};

AdminProtectedRoute.propTypes = {
    children: PropTypes.node,
}

export default AdminProtectedRoute;