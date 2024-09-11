import DashboardNavigation from "@/Components/Shared/DashboardNavigation/DashboardNavigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, NavLink, Outlet } from "react-router-dom";
import "../CSS/activeNavLinkStyle.css";

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className="md:flex grid grid-cols-1 md:grid-cols-4">
            <div style={{ height: '100%', minHeight: '100vh' }} className="hidden md:flex">
                <Sidebar collapsed={collapsed}>
                    <Menu>
                        <NavLink to="addAPet" className="font-medium">
                            <MenuItem prefix="➕">Add a Pet</MenuItem>
                        </NavLink>
                        <NavLink to="myAddedPets" className="font-medium">
                            <MenuItem prefix="🐶">My Added Pets</MenuItem>
                        </NavLink>
                        <NavLink to="adoptionRequest" className="font-medium">
                            <MenuItem prefix="📨">Adoption Request</MenuItem>
                        </NavLink>
                        <NavLink to="createDonationCampaign" className="font-medium">
                            <MenuItem prefix="📢">Create Donation Campaign</MenuItem>
                        </NavLink>
                        <NavLink to="myDonationCampaigns" className="font-medium">
                            <MenuItem prefix="📊">My Donation Campaigns</MenuItem>
                        </NavLink>
                        <NavLink to="myDonations" className="font-medium">
                            <MenuItem prefix="🙌">My Donations</MenuItem>
                        </NavLink>
                    </Menu>
                </Sidebar>
            </div>
            <div className="md:hidden">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col items-center">
                        <Link to="/" className="flex items-center rtl:space-x-reverse">
                            <img src="https://i.ibb.co/xhR1tDW/logo.png" className="h-8" alt="FelizTails Logo" />
                            <p className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Feliz<span className="text-[#F03D5E]">Tails</span></p>
                        </Link>
                        <p className="tracking-widest text-sm -mt-2">Dashboard</p>
                    </div>
                    <DashboardNavigation></DashboardNavigation>
                </div>
                <Outlet></Outlet>
            </div>
            <main style={{ padding: 10 }} className="md:col-span-3 w-full hidden md:block">
                <div className="flex justify-between items-center px-5">
                    <button className="sb-button hidden md:flex" onClick={() => setCollapsed(!collapsed)}>
                        <FaBars></FaBars>
                    </button>
                    <div className="flex flex-col items-center">
                        <Link to="/" className="flex items-center rtl:space-x-reverse">
                            <img src="https://i.ibb.co/xhR1tDW/logo.png" className="h-8" alt="FelizTails Logo" />
                            <p className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Feliz<span className="text-[#F03D5E]">Tails</span></p>
                        </Link>
                        <p className="tracking-widest">Dashboard</p>
                    </div>
                </div>
                <Outlet></Outlet>
            </main>
        </div>
    );
};

export default Dashboard;