import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Select from 'react-select';
import ReactQuill from "react-quill";

const image_hosting_key = import.meta.env.VITE_imageHosingApiKey;
const image_hosting_Api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const CreateDonationCampaignForm = () => {
    const [categoryError, setCategoryError] = useState(null);
    const [longDescriptionError, setLongDescriptionError] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [value, setValue] = useState("");
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const options = [
        { value: 'CAT', label: 'Cat'},
        { value: 'Dog', label: 'Dog' },
        { value: 'Bunny', label: 'Bunny' },
        { value: 'Bear', label: 'Bear' },
        { value: 'Rat', label: 'Rat' },
        { value: 'Fish', label: 'Fish' },
    ]

    const onSubmit = async (data) => {
        if (!selectedOption) {
            return setCategoryError(true);
        }
        if (!value) {
            return setLongDescriptionError(true);
        }
        setCategoryError(false);
        setLongDescriptionError(false);

        const imgFile = { image: data.photo[0] };
        const res = await axiosPublic.post(image_hosting_Api, imgFile, { headers: { "content-type": "multipart/form-data", } })
        const photoUrl = res.data.data.url;
        const name = data?.petName;
        const age = data?.age;
        const category = selectedOption?.value;
        const location = data?.location;
        const shortDescription = data?.shortDescription;
        const longDescription = value;
        const petInfo = {
            name,
            image: photoUrl,
            age,
            location,
            category,
            shortDescription,
            longDescription,
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('hh:mm:ss'),
            adopted: false,
            addedBy: {
                name: user?.displayName,
                email: user?.email,
            }
        }
        const response = await axiosSecure.put(`/update-a-pet`, petInfo)
        if (response.data.modifiedCount > 0) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your pet info updated successfully!",
                showConfirmButton: false,
                timer: 1500
            });
            reset();
        }
        else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "No info have to update.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    };

    return (
        <div className="my-6 md:my-8 lg:my-12 xl:my-16 px-4 md:px-6 lg:px-12 xl:px-24">
            <div className="bg-gray-100 rounded-lg p-4 md:p-6 lg:p-8 space-y-4">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                    <h3 className="text-xl md:col-span-2 lg:text-2xl font-semibold text-center mb-4 md:mb-6">Update Pet Info</h3>
                    <div>
                        <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pet Image</label>
                        <input type="file" id="photo" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            accept=".xlsx,.xls,image/*,.png,.jpeg,.jpg"
                            {...register("photo", { required: true })} />
                        <p className="text-red-600 text-sm">{errors.photo && <span>This field is required*</span>}</p>
                    </div>
                    <div>
                        <label htmlFor="petName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pet Name</label>
                        <input type="text" id="petName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Pet Name"
                            {...register("petName", { required: true, minLength: 2, maxLength: 24 })} />
                        <p className="text-red-600 text-sm">{errors?.petName && <span>Pet must have a name*</span>}</p>
                        <p className="text-red-600 text-sm">{errors?.petName?.type === "minLength" && <span>Name Must be minimum of 2 character long*</span>}</p>
                        <p className="text-red-600 text-sm">{errors?.petName?.type === "maxLength" && <span>Name Cant be more then 24 character long*</span>}</p>
                    </div>
                    <div>
                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                        <input type="number" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="age"
                            {...register("age", { required: true, min: 1, max: 50 })} />
                        <p className="text-red-600 text-sm">{errors.age && <span>Pet must have an age*</span>}</p>
                    </div>
                    <div>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            name="category"
                            id="category"
                        />
                        <p className="text-red-600 text-sm">{categoryError && <span>Select a category*</span>}</p>
                    </div>
                    <div className="mb-6 md:col-span-2">
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                        <input type="text" id="location" defaultValue={location} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="location"
                            {...register("location", { required: true })} />
                        <p className="text-red-600 text-sm">{errors?.location && <span>provide full location*</span>}</p>
                    </div>
                    <div className="mb-6 md:col-span-2">
                        <label htmlFor="shortDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short Description</label>
                        <textarea name="shortDescription" id="shortDescription" placeholder="small note from the pet owner" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" {...register("shortDescription", { required: true })}></textarea>
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

export default CreateDonationCampaignForm;