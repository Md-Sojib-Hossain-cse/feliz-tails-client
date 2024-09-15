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
import UserProtectedRoute from "./UserProtectedRoute/UserProtectedRoute";
import AddAPet from "@/Pages/AddAPet/AddAPet";
import MyAddedPets from "@/Pages/MyAddedPets/MyAddedPets";
import AdoptionRequest from "@/Pages/AdoptionRequest/AdoptionRequest";
import CreateDonationCampaign from "@/Pages/CreateDonationCampaign/CreateDonationCampaign";
import MyDonationCampaigns from "@/Pages/MyDonationCampaigns/MyDonationCampaigns";
import MyDonations from "@/Pages/MyDonations/MyDonations";
import PetUpdate from "@/Pages/PetUpdate/PetUpdate";
import EditDonation from "@/Pages/EditDonation/EditDonation";

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
                element : <UserProtectedRoute>
                    <AddAPet></AddAPet>
                </UserProtectedRoute>
            },
            {
                path : "PetUpdate/:id",
                element : <UserProtectedRoute>
                    <PetUpdate></PetUpdate>
                </UserProtectedRoute>,
                loader : ({params}) => fetch(`http://localhost:5000/petDetails/${params.id}`)
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
                path : "EditDonation/:id",
                element : <UserProtectedRoute>
                    <EditDonation></EditDonation>
                </UserProtectedRoute>,
                loader : ({params}) => fetch(`http://localhost:5000/my-donation-campaign/${params.id}`)
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