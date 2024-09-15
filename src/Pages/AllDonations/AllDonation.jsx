import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllDonation = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allDonations = [] , refetch} = useQuery({
        queryKey: ['all-donations'],
        queryFn: async () => {
            const res = await axiosSecure.get("/donation-campaign")
            return res.data;
        }
    })

    const handleDelete = async (id) => {
        const res = await axiosSecure.delete(`/all-donation-campaign/${id}`)
        if (res.data.deletedCount) {
            Swal.fire({
                position: "Center",
                icon: "info",
                title: "Campaign Paused.",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    }
    const handlePause = async (id) => {
        const updatedDoc = {isPaused : "true"}
        const res = await axiosSecure.patch(`/all-donation-campaign/${id}` , updatedDoc)
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "Center",
                icon: "info",
                title: "Campaign Paused.",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    }
    const handleResume = async (id) => { 
        const updatedDoc = {isPaused : "false"}
        const res = await axiosSecure.patch(`/all-donation-campaign/${id}` , updatedDoc)
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "Center",
                icon: "success",
                title: "Campaign Resumed.",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    }


    return (
        <div>
            <Helmet>
                <title>Feliz Tails - All Donations</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="Manage All Donation Campaigns"
                subHeading="Explore and review all ongoing and past donation campaigns. Track their progress, view details, and contribute to support worthy causes."
            ></SectionTitleWithBGPhoto>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pet Name</TableHead>
                            <TableHead>Pet Image</TableHead>
                            <TableHead>Delete</TableHead>
                            <TableHead>Edit</TableHead>
                            <TableHead>Pause</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            allDonations.map(donations => <TableRow key={donations._id}>
                                <TableCell>{donations.petName}</TableCell>
                                <TableCell><img src={donations.petImage} alt="" className="w-12 h-12 rounded-lg" /></TableCell>
                                <TableCell><button onClick={() => handleDelete(donations._id)} className="px-3 py-2 rounded-md bg-red-300 border-red-400 border text-red-600 hover:bg-red-100 hover:text-red-900">Delete</button></TableCell>
                                <TableCell>
                                    <Link to={`/dashboard/EditDonation/${donations._id}`} className="px-3 py-2 rounded-md bg-blue-300 border-blue-400 border text-blue-600 hover:bg-blue-100 hover:text-blue-900">Update</Link>
                                </TableCell>
                                <TableCell>
                                    {
                                        donations?.isPaused === "true" ? <button onClick={() => handleResume(donations._id)} className="px-3 py-2 rounded-md bg-green-300 border-green-400 border text-green-600 hover:bg-green-100 hover:text-green-900">Resume</button> :
                                            <button onClick={() => handlePause(donations._id)} className="px-3 py-2 rounded-md bg-green-300 border-green-400 border text-green-600 hover:bg-green-100 hover:text-green-900">Pause</button>
                                    }
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>

            </div>
        </div>
    );
};

export default AllDonation;