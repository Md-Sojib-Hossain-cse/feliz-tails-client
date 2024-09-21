import axios from "axios";

const axiosPublic = axios.create({
    baseURL : "https://feliz-tails-server.vercel.app",
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;