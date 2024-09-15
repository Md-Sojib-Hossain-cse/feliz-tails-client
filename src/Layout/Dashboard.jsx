import DashboardNavigation from "@/Components/Shared/DashboardNavigation/DashboardNavigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, NavLink, Outlet } from "react-router-dom";
import "../CSS/activeNavLinkStyle.css";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const { data = "", isLoading } = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/${user?.email}`)
            return res.data;
        }
    })

    return (
        <div className="md:flex grid grid-cols-1 md:grid-cols-4">
            <div style={{ height: 'auto', minHeight: '100vh' }} className="hidden md:flex">
                <Sidebar collapsed={collapsed}>
                    <Menu>
                        <NavLink to="" className="font-medium">
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
                            <MenuItem prefix="🎯">My Donation Campaigns</MenuItem>
                        </NavLink>
                        <NavLink to="myDonations" className="font-medium">
                            <MenuItem prefix="🙌">My Donations</MenuItem>
                        </NavLink>
                        {
                            data?.role === "Admin" &&
                            <>
                                <div className="mt-2 border-t border-gray-600"></div>
                                <NavLink to="users" className="font-medium">
                                    <MenuItem prefix="👩‍👩‍👦">Users</MenuItem>
                                </NavLink>
                            </>
                        }
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
                        <p className="tracking-widest text-sm -mt-2 ml-5">Dashboard</p>
                    </div>
                    <div className="basis-full">
                        <DashboardNavigation></DashboardNavigation>
                    </div>
                </div>
                <Outlet></Outlet>
            </div>
            <main className="md:col-span-3 w-full hidden md:block">
                <div className="flex justify-between items-center px-5">
                    <div className="flex gap-6 items-center">
                        <button className="sb-button hidden md:flex" onClick={() => setCollapsed(!collapsed)}>
                            <FaBars></FaBars>
                        </button>
                        <Link to="/" className="text-lg font-medium hover:bg-gray-100 py-2 px-3 rounded-sm">Home</Link>
                    </div>
                    <Link className="flex flex-col items-center">
                        <div className="flex items-center rtl:space-x-reverse">
                            <img src="https://i.ibb.co/xhR1tDW/logo.png" className="h-8" alt="FelizTails Logo" />
                            <p className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Feliz<span className="text-[#F03D5E]">Tails</span></p>
                        </div>
                        <p className="tracking-widest ml-4 -mt-2">Dashboard</p>
                    </Link>
                </div>
                <div className="my-2 md:my-3 lg:my-5 xl:my-6">
                    <Outlet></Outlet>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;