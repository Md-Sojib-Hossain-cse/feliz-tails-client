import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import DonationCampaignModal from "./DonationCampaignModal/DonationCampaignModal";
import DonationCampaignCard from "../DonationCampaigns/DonationCampaignCard.jsx/DonationCampaignCard";


const DonationDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data = {} , refetch} = useQuery({
        queryKey: ["donation-campaign"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donation-campaign/${id}`);
            return res.data;
        }
    })

    const { data: recommendedDonation = [] } = useQuery({
        queryKey: ['recommended-donation'],
        queryFn: async () => {
            const res = await axiosPublic.get("/donation-campaign-recommended?page=1&limit=3")
            return res.data;
        }
    })

    return (
        <section className="my-6 md:my-8 lg:my-12 xl:my-16 px-4 md:px-6 lg:px-12 xl:px-24">
            <img src={data?.petImage} alt="" className="w-60 h-60 object-cover rounded-full mx-auto border-2 border-gray-100" />
            <div className="mt-6 md:mt-8">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-20 w-1/2">Pet Name</TableHead>
                            <TableHead className="text-right min-w-20 w-1/2">{data?.petName}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-normal min-w-20 w-1/2">Max Amount</TableCell>
                            <TableCell className="text-right min-w-20 w-1/2">${data?.maxDonationAmount}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-normal min-w-20 w-1/2">Donated</TableCell>
                            <TableCell className="text-right min-w-20 w-1/2">${data?.donatedAmount || 0}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-normal min-w-20 w-1/2">Details</TableCell>
                            <TableCell className="text-right min-w-20 w-1/2">{data.longDescription}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-normal min-w-20 w-1/2">Posting Date</TableCell>
                            <TableCell className="text-right min-w-20 w-1/2">{data?.createdAt?.split("T")[0]}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="flex justify-end items-center py-4 lg:py-6">
                    <DonationCampaignModal key={data?._id} campaignDetails={data} refetch={refetch}></DonationCampaignModal>
                </div>
            </div>
            <section className="py-6 lg:py-8">
                <h3 className="text-center font-medium text-xl lg:text-2xl mb-6">More Ongoing Campaigns..</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {
                        recommendedDonation.map(donationData => <DonationCampaignCard key={donationData._id} pets={donationData} refetch={refetch}></DonationCampaignCard>)
                    }
                </div>
            </section>
        </section>
    );
};

export default DonationDetails;