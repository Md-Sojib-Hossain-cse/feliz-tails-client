import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import PetListing from "@/Pages/PetListing/PetListing/PetListing";
import DonationCampaigns from "@/Pages/DonationCampaigns/DonationCampaigns/DonationCampaigns";
import Register from "@/Pages/Register/Register";
import PetDetails from "@/Pages/PetDetails/PetDetails";
import Login from "@/Pages/Login/Login";
import DonationDetails from "@/Pages/DonationDetails/DonationDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children : [
            {
                index : true,
                element : <Home></Home>,
            },
            {
                path : "/petListing",
                element : <PetListing></PetListing>,
            },
            {
                path : "/petDetails/:id",
                element : <PetDetails></PetDetails>,
            },
            {
                path : "/donationCampaigns",
                element : <DonationCampaigns></DonationCampaigns>,
            },
            {
                path : "/donationCampaign/:id",
                element : <DonationDetails></DonationDetails>,
            },
            {
                path : "/register",
                element : <Register></Register>,
            },
            {
                path : "/login",
                element : <Login></Login>,
            },
        ]
    },
]);


export default router;