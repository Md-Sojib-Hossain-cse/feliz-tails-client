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
import AdminProtectedRoute from "./AdminProtectedRoute/AdminProtectedRoute";
import Users from "@/Pages/Users/Users";
import AllPets from "@/Pages/AllPets/AllPets";
import AllDonation from "@/Pages/AllDonations/AllDonation";
import ErrorPage from "@/Pages/ErrorPage/ErrorPage";

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
        ],
        errorElement : <ErrorPage></ErrorPage>
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
                loader : ({params}) => fetch(`https://feliz-tails-server.vercel.app/petDetails/${params.id}`)
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
            },
            {
                path : "MyDonations",
                element : <UserProtectedRoute>
                    <MyDonations></MyDonations>
                </UserProtectedRoute>
            },
            {
                path : "users",
                element : <AdminProtectedRoute>
                    <Users></Users>
                </AdminProtectedRoute>
            },
            {
                path : "allPets",
                element : <AdminProtectedRoute>
                    <AllPets></AllPets>
                </AdminProtectedRoute>
            },
            {
                path : "allDonations",
                element : <AdminProtectedRoute>
                    <AllDonation></AllDonation>
                </AdminProtectedRoute>
            },
        ],
        errorElement : <ErrorPage></ErrorPage>
    }
]);


export default router;