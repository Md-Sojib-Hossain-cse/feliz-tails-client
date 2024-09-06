import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import "./Navbar.css";
import useAuth from "@/hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const { user, loading, logOut } = useAuth();

    const toggleDropdown = () => {
        if (!isDropdownOpen) {
            setIsNavOpen(false);
        }
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleNav = () => {
        if (!isNavOpen) {
            setIsDropdownOpen(false);
        }
        setIsNavOpen(!isNavOpen);
    };

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    position: "center-center",
                    icon: "success",
                    title: "User successfully logged Out from Feliz Tails",
                    showConfirmButton: false,
                    background: "#FFF",
                    timer: 1500,
                });
            })
            .catch(() => {
                Swal.fire({
                    position: "center-center",
                    icon: "error",
                    title: "Something Wrong! Can't logged Out at this moment.",
                    showConfirmButton: false,
                    background: "#FFF",
                    timer: 1500,
                });
            })
    }

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap md:gap-8 items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center rtl:space-x-reverse">
                    <img src="https://i.ibb.co/xhR1tDW/logo.png" className="h-8" alt="FelizTails Logo" />
                    <p className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Feliz<span className="text-[#F03D5E]">Tails</span></p>
                </Link>
                {
                    loading ? <p>Loading...</p> : user ? <div className="flex relative items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded={isDropdownOpen}
                            onClick={toggleDropdown}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full object-cover" src={user?.photoURL ? user?.photoURL : "https://i.ibb.co/YjYJphk/demo-Profile-Image.png"} alt="user photo" referrerPolicy="no-referrer"/>
                        </button>
                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div
                                className="z-50 absolute top-8 right-12 md:right-0 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                                id="user-dropdown"
                            >
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-900 dark:text-white">{user?.displayName || "anonymous"}</span>
                                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user?.email || "no email found"}</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={handleLogOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                                            LogOut
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                        <button
                            onClick={toggleNav}
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-user"
                            aria-expanded={isNavOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <FaBars />
                        </button>
                    </div> : ""
                }
                <div className={`relative items-center md:flex-1 justify-end ${isNavOpen ? 'flex' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
                    <ul className="flex flex-col absolute md:static top-0 right-0 font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <NavLink
                                to="/"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/petListing"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Pet Listing
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/donationCampaigns"
                                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Donation Campaigns
                            </NavLink>
                        </li>
                        {
                            loading ? <p>loading...</p> : !user ? <li>
                                <NavLink
                                    to="/login"
                                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    Login
                                </NavLink>
                            </li> : ""
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;