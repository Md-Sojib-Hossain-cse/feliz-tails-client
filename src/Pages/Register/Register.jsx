import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_imageHosingApiKey;
const image_hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const Register = () => {
    const [error, setError] = useState("");
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const { createUser, updateUser, googleSignIn, facebookSignIn } = useAuth();

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then((result) => {
                const user = result.user;
                setError("");
                const userData = {
                    name: user?.displayName,
                    email: user?.email,
                    role: "user",
                }
                console.log(user);
                if (user) {
                    axiosPublic.post("/users", userData)
                        .then(() => {
                            Swal.fire({
                                position: "center-center",
                                icon: "success",
                                title: `${user?.displayName} has been successfully registered`,
                                showConfirmButton: false,
                                background: "#FFF",
                                timer: 1000
                            });
                            setError("")
                        })
                        .catch(err => {
                            setError(err.message)
                        })
                }
            })
            .catch((err) => {
                setError(err.message);
            })
    }

    const handleFacebookSignIn = () => {
        facebookSignIn()
            .then((result) => {
                const user = result.user;
                setError("");
                const userData = {
                    name: user?.displayName,
                    email: user?.email,
                    role: "user",
                }
                console.log(user);
                if (user) {
                    axiosPublic.post("/users", userData)
                        .then(() => {
                            Swal.fire({
                                position: "center-center",
                                icon: "success",
                                title: `${user?.displayName} has been successfully registered`,
                                showConfirmButton: false,
                                background: "#FFF",
                                timer: 1000
                            });
                            setError("")
                        })
                        .catch(err => {
                            setError(err.message)
                        })
                }
            })
            .catch((err) => {
                setError(err.message);
            })
    }

    const onSubmit = async (data) => {
        const imgFile = { image: data.photo[0] };
        const res = await axiosPublic.post(image_hosting_Api, imgFile, { headers: { "content-type": "multipart/form-data", } })
        const photoUrl = res.data.data.url;
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const userData = {
            name,
            email,
            role: "user",
        }
        createUser(email, password)
            .then((result) => {
                setError("");
                const user = result?.user;
                if (user) {
                    axiosPublic.post("/users", userData)
                        .then(res => {
                            if (res.data.insertedId) {
                                Swal.fire({
                                    position: "center-center",
                                    icon: "success",
                                    title: `${user?.displayName} has been successfully registered`,
                                    showConfirmButton: false,
                                    background: "#FFF",
                                    timer: 1000
                                });
                                updateUser(user, name, photoUrl)
                                    .then(() => {
                                        Swal.fire({
                                            position: "center-center",
                                            icon: "success",
                                            title: `${user?.displayName} profile has been updated successfully`,
                                            showConfirmButton: false,
                                            background: "#FFF",
                                            timer: 1500,
                                        });
                                        setError("");
                                        reset();
                                    })
                                    .catch(error => {
                                        setError(error.message)
                                    })
                            }
                        })
                        .catch(err => {
                            setError(err.message)
                        })
                }
            })
            .catch((err) => {
                setError(err.message);
            })
    };

    return (
        <div className="my-6 md:my-8 lg:my-12 xl:my-16 px-4 md:px-6 lg:px-12 xl:px-24 grid grid-cols-1 md:grid-cols-2 justify-center items-center">
            <Helmet>
                <title>Feliz Tails - Register</title>
            </Helmet>
            <img src="https://i.ibb.co/N2kfV48/dogfacing.gif" alt="dog" className="mx-auto relative -top-20" />
            <div className="bg-gray-100 rounded-lg p-4 md:p-6 lg:p-8 space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full max-w-lg mx-auto">
                    <h3 className="text-xl lg:text-2xl font-semibold text-center mb-4 md:mb-6">Join the Family</h3>
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Full Name</label>
                        <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username"
                            {...register("name", { required: true, minLength: 5, maxLength: 24 })} />
                        <p className="text-red-600 text-sm">{errors?.name?.type === "minLength" && <span>Name Must be minimum of 5 character long*</span>}</p>
                        <p className="text-red-600 text-sm">{errors?.name?.type === "maxLength" && <span>Name Cant be more then 24 character long*</span>}</p>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@mail.com"
                            {...register("email", { required: true }, { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
                        <p className="text-red-600 text-sm">{errors.email && <span>This field is required*</span>}</p>
                    </div>
                    <div>
                        <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo</label>
                        <input type="file" id="photo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            accept=".xlsx,.xls,image/*,.png,.jpeg,.jpg"
                            {...register("photo", { required: true })} />
                        <p className="text-red-600 text-sm">{errors.photo && <span>This field is required*</span>}</p>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••"
                            {...register("password", { required: true, minLength: 6, maxLength: 20 })} />
                        <p className="text-red-600 text-sm">{errors?.password?.type === "minLength" && <span>Password must be at least 6 character long*</span>}</p>
                        <p className="text-red-600 text-sm">{errors?.password?.type === "maxLength" && <span>Password Can't be more then 20 character long*</span>}</p>
                    </div>
                    <Link to="/login" className="py-2 block"><small>Already have an account ? <span className="text-blue-600">Login</span></small></Link>
                    {error ? <p className="text-red-600 text-sm">{error.split("(")[1].replace(")", "")}</p> : ""}
                    <input type="submit" className="text-white bg-[#EC3562] hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-[#EC3562] dark:hover:bg-gray-400 dark:focus:ring-gray-400 transition delay-100" value="Submit"></input>
                </form>
                <div className="border border-gray-300"></div>
                <div className="flex flex-col gap-4 lg:flex-row">
                    <div>
                        <button onClick={handleGoogleSignIn} type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                            <FaGoogle className="text-[#EC3562]"></FaGoogle>
                            SignUp using Google
                        </button>
                    </div>
                    <div>
                        <button onClick={handleFacebookSignIn} type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center gap-2 dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700">
                            <FaFacebook className="text-[#EC3562]"></FaFacebook>
                            SignUp using Facebook
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;