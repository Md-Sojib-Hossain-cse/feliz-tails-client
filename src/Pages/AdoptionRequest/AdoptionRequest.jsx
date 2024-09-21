import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import { Helmet } from "react-helmet-async";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdoptionRequest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: adoptionRequests = []  , refetch} = useQuery({
        queryKey: ['adoption-requests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-pets-adoption-request/${user?.email}`)
            console.log(res.data)
            return res.data;
        }
    })

    const handleAccept = async (listingId,adoptionRequestId) => {
        const res = await axiosSecure.patch(`/my-pets-adoption-request?listingId=${listingId}&adoptionRequestId=${adoptionRequestId}`)
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Pet Adoption request accepted",
                showConfirmButton: false,
                timer: 1500
            });
            refetch()
        }
        else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Something Wrong , Can't accept request right now!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleReject = async(id) => {
        const res = await axiosSecure.delete(`/my-pets-adoption-request/${id}`)
        console.log(res.data)
        if (res.data.deletedCount) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Pet Adoption request Rejected",
                showConfirmButton: false,
                timer: 1500
            });
            refetch()
        }
        else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Something Wrong , Can't Reject request right now!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    return (
        <div>
            <Helmet>
                <title>Feliz Tails - Adoption Request</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="Adoption Requests"
                subHeading="Review and manage all the adoption requests submitted for your pets. Approve or decline requests and connect with potential adopters to find the perfect home for your pets."
            ></SectionTitleWithBGPhoto>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pet Name</TableHead>
                            <TableHead>Pet Image</TableHead>
                            <TableHead>Requested By</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            adoptionRequests.map(details => <TableRow key={details._id}>
                                <TableCell>{details.petInfo.name}</TableCell>
                                <TableCell><img src={details.petInfo.image} alt="" className="h-12 w-12 rounded-lg object-cover" /></TableCell>
                                <TableCell>
                                    <div>
                                        <p>Name: {details.userInfo.userName}</p>
                                        <p>Phone: {details.userInfo.phone}</p>
                                        <p>Email: {details.userInfo.userEmail}</p>
                                        <p>Location: {details.userInfo.address}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {
                                        details?.petInfo?.adopted ? <button className="px-3 py-2 rounded-md border-green-300 border bg-green-400 text-white transition duration-75">Adopted</button> : <button onClick={() => handleAccept(details?.petInfo?._id , details?._id)} className="px-3 py-2 rounded-md border-green-300 border hover:bg-green-400 hover:text-white transition duration-75">Accept</button>
                                    }
                                    <button onClick={() => handleReject(details._id)} className="px-3 ml-2 py-2 rounded-md border-orange-300 border hover:bg-orange-400 hover:text-orange transition duration-75">Reject</button>
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AdoptionRequest;