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


const DonationDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data = {} } = useQuery({
        queryKey: ["donation-campaign"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/donation-campaign/${id}`);
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
                    <DonationCampaignModal key={data?._id} campaignDetails={data}></DonationCampaignModal>
                </div>
            </div>
        </section>
    );
};

export default DonationDetails;