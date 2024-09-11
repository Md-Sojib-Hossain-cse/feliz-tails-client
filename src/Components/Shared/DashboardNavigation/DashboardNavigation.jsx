import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { FaBars } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import "../../../CSS/activeNavLinkStyle.css";

const DashboardNavigation = () => {
    return (
        <NavigationMenu className="basis-1/2 text-right">
            <NavigationMenuList>
                <NavigationMenuItem className="md:hidden">
                    <NavigationMenuTrigger className="p-4"><FaBars></FaBars></NavigationMenuTrigger>
                    <NavigationMenuContent className="absolute flex flex-col bg-slate-50 dark:bg-slate-800 text-black dark:text-white shadow-lg rounded-sm w-full max-w-sm p-2 right-0">
                        <NavLink to="addAPet">
                            <NavigationMenuLink className="font-medium border-b block py-3">Add a Pet</NavigationMenuLink>
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
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

export default DashboardNavigation;