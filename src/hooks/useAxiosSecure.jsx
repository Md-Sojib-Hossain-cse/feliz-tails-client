import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "https://feliz-tails-server.vercel.app",
    withCredentials: true
})
const useAxiosSecure = () => {
    // const navigate = useNavigate();
    // const { logOut } = useAuth();

    // axiosSecure.interceptors.request.use(function (config) {
    //     return config;
    // }, function (error) {
    //     return Promise.reject(error);
    // });
    // // Add a response interceptor
    // axiosSecure.interceptors.response.use(function (response) {
    //     return response;
    // }, function (error) {
    //     if(error?.status === 401 || error?.status === 403){
    //         logOut();
    //         navigate("/login");
    //     }
    //     return Promise.reject(error);
    // });

    return axiosSecure;
};

export default useAxiosSecure;