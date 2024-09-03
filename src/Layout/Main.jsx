import Navbar from "@/Pages/Shared/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;