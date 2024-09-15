import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import { Helmet } from "react-helmet-async";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useAuth from "@/hooks/useAuth";
import MyDonationTableRow from "./MyDonationTableRow/MyDonationTableRow";


const MyDonationCampaigns = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data : myCampaigns = []  , refetch} = useQuery({
        queryKey: ['my-donation-campaigns' , user?.email],
        queryFn: async () => {
            const res =await axiosSecure.get(`/my-donation-campaign?email=${user?.email}`)
            return res.data;
        }
    })


    return (
        <div>
            <Helmet>
                <title>Feliz Tails - My Donation Campaigns</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="My Donation Campaigns"
                subHeading="Manage and track all your active and past donation campaigns. Keep an eye on contributions and make updates to ensure the success of your initiatives."
            ></SectionTitleWithBGPhoto>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Pet Name</TableHead>
                            <TableHead>Maximum Donation Amount</TableHead>
                            <TableHead>Donation Progress</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Edit</TableHead>
                            <TableHead>View Donators</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            myCampaigns.map((campaignData) => <MyDonationTableRow key={campaignData._id} campaignData={campaignData} refetch={refetch}></MyDonationTableRow>)
                        }
                    </TableBody>
                </Table>

            </div>
        </div>
    );
};

export default MyDonationCampaigns;