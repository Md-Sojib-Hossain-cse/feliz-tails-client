import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import { Helmet } from "react-helmet-async";
import EditDonationCampaignForm from "./EditDonationCampaignForm/EditDonationCampaignForm";
import { useParams } from "react-router-dom";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const EditDonation = () => {
    const params = useParams()
    const axiosSecure = useAxiosSecure();
    const {data : previousData = []} = useQuery({
        queryKey : ['edit-donation' , params.id],
        queryFn : async () => {
            const res = await axiosSecure.get(`/my-donation-campaign/${params.id}`)
            return res.data;
        }
    })
    return (
        <div>
            <Helmet>
                <title>Feliz Tails - Edit Donation Campaign</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="Edit Donation Campaign"
                subHeading="Update the details of your donation campaign. Modify the target amount, progress, or campaign status to keep everything aligned with your goals and ensure continued support."
            ></SectionTitleWithBGPhoto>
            <div>
                <EditDonationCampaignForm previousData={previousData}></EditDonationCampaignForm>
            </div>
        </div>
    );
};

export default EditDonation;