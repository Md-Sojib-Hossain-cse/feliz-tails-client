import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { FaBars } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import "../../../CSS/activeNavLinkStyle.css";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const DashboardNavigation = () => {
    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();

    const {data = "" } = useQuery({
        queryKey : ['user-role' , user?.email ],
        queryFn : async() => {
            const res = await axiosPublic.get(`/user/${user?.email}`)
            return res.data;
        }
    })
    return (
        <NavigationMenu className="text-right text-sm">
            <NavigationMenuList>
                <NavigationMenuItem className="md:hidden">
                    <NavigationMenuTrigger className="p-4"><FaBars></FaBars></NavigationMenuTrigger>
                    <NavigationMenuContent className="absolute flex flex-col bg-slate-50 dark:bg-slate-800 text-black dark:text-white shadow-lg rounded-sm w-full max-w-sm p-2 right-0">
                        <NavLink to="/">
                            <NavigationMenuLink className="font-medium border-b block py-3">Home</NavigationMenuLink>
                        </NavLink>
                        <NavLink to="">
                            <NavigationMenuLink className="font-medium border-b block py-3">Add a pet</NavigationMenuLink>
                        </NavLink>
                        <NavLink to="myAddedPets">
                            <NavigationMenuLink className="font-medium border-b block py-3">My Added Pets</NavigationMenuLink>
                        </NavLink>
                        <NavLink to="adoptionRequest">
                            <NavigationMenuLink className="font-medium border-b block py-3">Adoption Request</NavigationMenuLink>
                        </NavLink>
                        <NavLink to="createDonationCampaign">
                            <NavigationMenuLink className="font-medium border-b block py-3">Create Donation Campaigns</NavigationMenuLink>
                        </NavLink>
                        <NavLink to="myDonationCampaigns">
                            <NavigationMenuLink className="font-medium border-b block py-3">My Donation Campaigns</NavigationMenuLink>
                        </NavLink>
                        <NavLink to="myDonations">
                            <NavigationMenuLink className="font-medium border-y block py-3">My Donations</NavigationMenuLink>
                        </NavLink>
                        {
                            data?.role === "Admin" &&
                            <>
                                <div className="mt-2 border-t border-gray-600"></div>
                                <NavLink to="users">
                                <NavigationMenuLink className="font-medium border-y block py-3">Users</NavigationMenuLink>
                                </NavLink>
                                <NavLink to="allPets">
                                <NavigationMenuLink className="font-medium border-y block py-3">All Pets</NavigationMenuLink>
                                </NavLink>
                            </>
                        }
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default DashboardNavigation;