import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import PetListing from "@/Pages/PetListing/PetListing/PetListing";
import DonationCampaigns from "@/Pages/DonationCampaigns/DonationCampaigns/DonationCampaigns";
import Register from "@/Pages/Register/Register";
import PetDetails from "@/Pages/PetDetails/PetDetails";

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
                path : "/register",
                element : <Register></Register>,
            },
        ]
    },
]);


export default router;