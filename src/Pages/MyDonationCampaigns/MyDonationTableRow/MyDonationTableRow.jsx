import { TableCell, TableRow } from "@/Components/ui/table";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import ProgressBar from "@ramonak/react-progress-bar";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const MyDonationTableRow = ({ campaignData, refetch }) => {
    const { _id, petName, maxDonationAmount, donatedAmount, isPaused, donationDetails } = campaignData;
    const tillDonated = donatedAmount || 0
    const progress = (parseInt(tillDonated) / parseInt(maxDonationAmount) * 100);
    const axiosSecure = useAxiosSecure();
    console.log(isPaused)

    const handlePause = async (id) => {
        const res = await axiosSecure.patch(`/my-donation-campaign/${id}?paused=${true}`)
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Donation Campaign Paused",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };

    const handleResume = async (id) => {
        const res = await axiosSecure.patch(`/my-donation-campaign/${id}?paused=${false}`)
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "center",
                icon: "info",
                title: "Donation Campaign Resumed",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    };
    return (
        <TableRow>
            <TableCell>{petName}</TableCell>
            <TableCell>{maxDonationAmount}</TableCell>
            <TableCell><ProgressBar completed={progress} /></TableCell>
            <TableCell>
                {
                    isPaused === "true" ? <button onClick={() => handleResume(_id)} className="px-3 py-2 rounded-md border-green-300 border hover:bg-green-400 hover:text-white transition duration-75">Resume</button> : <button onClick={() => handlePause(_id)} className="px-3 py-2 rounded-md border-green-300 border hover:bg-green-400 hover:text-white transition duration-75">Pause</button>
                }
            </TableCell>
            <TableCell><Link to={`/dashboard/EditDonation/${_id}`} className="px-3 py-2 rounded-md border-blue-300 border hover:bg-blue-400 hover:text-white transition duration-75">Edit</Link></TableCell>
            <TableCell>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">View Donators</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Donators</DialogTitle>
                            <DialogDescription>
                                {
                                    donationDetails.map((donationData, index) => <p key={index} className="flex justify-between items-center"><span>{index+1}.  {donationData.donatorName}</span> <span>${donationData.amount}</span></p>)
                                }
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </TableCell>
        </TableRow>
    );
};

MyDonationTableRow.propTypes = {
    campaignData: PropTypes.object,
    refetch: PropTypes.func,
}

export default MyDonationTableRow;