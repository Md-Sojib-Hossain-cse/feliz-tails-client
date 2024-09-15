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

const MyDonations = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data = [] , refetch } = useQuery({
        queryKey: ['my-donations', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-donations/${user?.email}`)
            console.log(res.data)
            return res.data;
        }
    })

    const handleRefund = (transactionId , id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't Refund!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Refund!"
        }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/my-donations?id=${id}&transactionId=${transactionId}`)
                if(res.data.modifiedCount){
                    Swal.fire({
                        title: "Refunded!",
                        icon: "success"
                    });
                    refetch();
                }
                else{
                    Swal.fire({
                        title: "Cant Refund at this moment!",
                        icon: "info"
                    });
                }
            }
        });
    }

    return (
        <div>
            <Helmet>
                <title>Feliz Tails - My Donation Campaigns</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="My Donations"
                subHeading="Track your contributions and see the impact of your donations. Review the campaigns you've supported and stay updated on their progress."
            ></SectionTitleWithBGPhoto>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pet Image</TableHead>
                            <TableHead>Pet Name</TableHead>
                            <TableHead>Donated Amount</TableHead>
                            <TableHead >Ask For Refund</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            data.map(donationData => <TableRow key={donationData._id}>
                                <TableCell><img src={donationData.petImage} alt="" className="w-12
                                h-12 rounded-lg"/></TableCell>
                                <TableCell>{donationData.petName}</TableCell>
                                <TableCell>{donationData.donationDetails.amount}</TableCell>
                                <TableCell><button onClick={() => handleRefund(donationData.donationDetails.transactionId , donationData._id)} className="text-green-600 border border-green-600 bg-green-300 rounded-md px-3 py-2">Ask For Refund</button></TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default MyDonations;