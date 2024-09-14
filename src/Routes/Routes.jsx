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
import Dashboard from "@/Layout/Dashboard";
import UserDashboard from "@/Pages/UserDashboard/UserDashboard";
import UserProtectedRoute from "./UserProtectedRoute/UserProtectedRoute";
import AddAPet from "@/Pages/AddAPet/AddAPet";
import MyAddedPets from "@/Pages/MyAddedPets/MyAddedPets";
import AdoptionRequest from "@/Pages/AdoptionRequest/AdoptionRequest";
import CreateDonationCampaign from "@/Pages/CreateDonationCampaign/CreateDonationCampaign";
import MyDonationCampaigns from "@/Pages/MyDonationCampaigns/MyDonationCampaigns";
import MyDonations from "@/Pages/MyDonations/MyDonations";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: "/petListing",
                element: <PetListing></PetListing>,
            },
            {
                path: "/petDetails/:id",
                element: <PetDetails></PetDetails>,
            },
            {
                path: "/donationCampaigns",
                element: <DonationCampaigns></DonationCampaigns>,
            },
            {
                path: "/donationCampaign/:id",
                element: <DonationDetails></DonationDetails>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
        ]
    },
    {
        path: "dashboard",
        element: <UserProtectedRoute>
            <Dashboard></Dashboard>
        </UserProtectedRoute>,
        children: [
            {
                index : true,
                element: <UserProtectedRoute>
                    <UserDashboard></UserDashboard>
                </UserProtectedRoute>
            },
            {
                path : "addAPet",
                element : <UserProtectedRoute>
                    <AddAPet></AddAPet>
                </UserProtectedRoute>
            },
            {
                path : "MyAddedPets",
                element : <UserProtectedRoute>
                    <MyAddedPets></MyAddedPets>
                </UserProtectedRoute>
            },
            {
                path : "AdoptionRequest",
                element : <UserProtectedRoute>
                    <AdoptionRequest></AdoptionRequest>
                </UserProtectedRoute>
            },
            {
                path : "CreateDonationCampaign",
                element : <UserProtectedRoute>
                    <CreateDonationCampaign></CreateDonationCampaign>
                </UserProtectedRoute>
            },
            {
                path : "MyDonationCampaigns",
                element : <UserProtectedRoute>
                    <MyDonationCampaigns></MyDonationCampaigns>
                </UserProtectedRoute>
            },
            {
                path : "MyDonations",
                element : <UserProtectedRoute>
                    <MyDonations></MyDonations>
                </UserProtectedRoute>
            },
        ]
    }
]);


export default router;