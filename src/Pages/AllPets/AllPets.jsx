import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllPets = () => {
    const axiosSecure = useAxiosSecure();
    const { data: pets = [], refetch } = useQuery({
        queryKey: ['all-pets'],
        queryFn: async () => {
            const res = await axiosSecure.get("/all-pets")
            return res.data;
        }
    })

    const handleMakeNotAdopted = async (id) => {
        const updatedInfo = { adopted: false };
        const res = await axiosSecure.patch(`/pet-listing/${id}`, updatedInfo)
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Status Updated",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    }

    const handleMakeAdopted = async (id) => {
        const updatedInfo = { adopted: true };
        const res = await axiosSecure.patch(`/pet-listing/${id}`, updatedInfo)
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Status Updated",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/pet-listing/${id}`)
                if (res.data.deletedCount) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Pet Data Deleted.",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>Feliz Tails - All Pets</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="Manage All Pets"
                subHeading="Browse through our diverse collection of pets available for adoption. Discover detailed profiles, learn about each pet's unique traits, and find your perfect companion today!"
            ></SectionTitleWithBGPhoto>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>petName</TableHead>
                            <TableHead>petImage</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Update</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            pets.map(pet => <TableRow key={pet._id}>
                                <TableCell className="font-medium">{pet.name}</TableCell>
                                <TableCell><img src={pet.image} alt="" className="w-12 h-12 rounded-lg bg-gray-500" /></TableCell>
                                <TableCell>{
                                    pet.adopted ? <button onClick={() => handleMakeNotAdopted(pet._id)} className="px-3 py-2 rounded-md bg-green-300 border-green-400 border text-green-600 hover:bg-green-100 hover:text-green-900">Make Not Adopted</button> : <button onClick={() => handleMakeAdopted(pet._id)} className="px-3 py-2 rounded-md bg-green-300 border-green-400 border text-green-600 hover:bg-green-100 hover:text-green-900">Make Adopted</button>
                                }</TableCell>
                                <TableCell >
                                    <Link to={`/dashboard/PetUpdate/${pet._id}`} className="px-3 py-2 rounded-md bg-blue-300 border-blue-400 border text-blue-600 hover:bg-blue-100 hover:text-blue-900">Update</Link>
                                </TableCell>
                                <TableCell >
                                    <button onClick={() => handleDelete(pet._id)} className="px-3 py-2 rounded-md bg-red-300 border-red-400 border text-red-600 hover:bg-red-100 hover:text-red-900">Delete</button>
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AllPets;