import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_imageHosingApiKey;
const image_hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditDonationCampaignForm = () => {
    const {_id ,  petName , maxDonationAmount , lastDateOfDonation , shortDescription , longDescription , petImage} = useLoaderData();
    const [longDescriptionError, setLongDescriptionError] = useState(null);
    const [value, setValue] = useState(longDescription);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const onSubmit = async (data) => {
        if (!value) {
            return setLongDescriptionError(true);
        }
        setLongDescriptionError(false);

        const imgFile = { image: data.photo[0] };
        const res = await axiosPublic.post(image_hosting_Api, imgFile, { headers: { "content-type": "multipart/form-data", } })
        const photoUrl = res.data.data.url || petImage;
        const petName = data?.petName;
        const maximumDonationAmount = data?.maximumDonationAmount;
        const lastDateOfDonation = data?.lastDateOfDonation;
        const shortDescription = data?.shortDescription;
        const longDescription = value;
        const petInfo = {
            petName,
            petImage: photoUrl,
            maxDonationAmount: maximumDonationAmount,
            lastDateOfDonation,
            shortDescription,
            longDescription,
            createdAt: moment().format(),
            addedBy: {
                name: user?.displayName,
                email: user?.email,
            }
        }
        const response = await axiosSecure.patch(`/donation-campaign/${_id}`, petInfo)
        if (response.data.modifiedCount > 0) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Donation Campaign Updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
        }
        else {
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Cant Update right now.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };
    return (
        <div className="my-6 md:my-8 lg:my-12 xl:my-16 px-4 md:px-6 lg:px-12 xl:px-24">
            <div className="bg-gray-100 rounded-lg p-4 md:p-6 lg:p-8 space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                    <h3 className="text-xl md:col-span-2 lg:text-2xl font-semibold text-center mb-4 md:mb-6">Edit Donation</h3>
                    <div>
                        <label htmlFor="petName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pet Name</label>
                        <input type="text" id="petName" defaultValue={petName} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name"
                            {...register("petName", { required: true, min: 100, max: 10000 })} />
                        <p className="text-red-600 text-sm">{errors?.petName && <span>Pet Name Required*</span>}</p>
                    </div>
                    <div>
                        <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pet Image</label>
                        <input type="file" id="photo" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            accept=".xlsx,.xls,image/*,.png,.jpeg,.jpg"
                            {...register("photo", { required: true })} />
                        <p className="text-red-600 text-sm">{errors.photo && <span>This field is required*</span>}</p>
                    </div>
                    <div>
                        <label htmlFor="maximumDonationAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Maximum Donation Amount</label>
                        <input type="number" id="maximumDonationAmount" defaultValue={maxDonationAmount} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1000"
                            {...register("maximumDonationAmount", { required: true, min: 100, max: 10000 })} />
                        <p className="text-red-600 text-sm">{errors?.maximumDonationAmount && <span>A Donation Amount Required*</span>}</p>
                        <p className="text-red-600 text-sm">{errors?.maximumDonationAmount?.type === "min" && <span>Minimum donation $100*</span>}</p>
                        <p className="text-red-600 text-sm">{errors?.maximumDonationAmount?.type === "max" && <span>Maximum Donation $10000*</span>}</p>
                    </div>
                    <div>
                        <label htmlFor="lastDateOfDonation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Donation Closed In</label>
                        <input type="date" id="lastDateOfDonation" defaultValue={lastDateOfDonation} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="yyyy-mm-dd"
                            {...register("lastDateOfDonation", { required: true })} />
                        <p className="text-red-600 text-sm">{errors.lastDateOfDonation && <span>Donation Ending Date Required*</span>}</p>
                    </div>
                    <div className="mb-6 md:col-span-2">
                        <label htmlFor="shortDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short Description</label>
                        <textarea name="shortDescription" id="shortDescription" defaultValue={shortDescription} placeholder="small note from the pet owner" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("shortDescription", { required: true })}></textarea>
                        <p className="text-red-600 text-sm">{errors?.shortDescription && <span>provide a short description*</span>}</p>
                    </div>
                    <div className="mb-6 md:col-span-2">
                        <label htmlFor="shortDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Long Description</label>
                        <ReactQuill theme="snow" value={value} onChange={setValue} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        <p className="text-red-600 text-sm">{longDescriptionError && <span>provide a Long description*</span>}</p>
                    </div>
                    <div className="md:col-span-2 flex justify-center items-center">
                        <input type="submit" className="text-white bg-[#EC3562] hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-[#EC3562] dark:hover:bg-gray-400 dark:focus:ring-gray-400 transition delay-100 w-full md:w-1/2 md:mx-auto" value="Submit"></input>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditDonationCampaignForm;