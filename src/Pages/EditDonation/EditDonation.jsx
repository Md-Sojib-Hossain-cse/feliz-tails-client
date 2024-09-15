import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import { Helmet } from "react-helmet-async";
import EditDonationCampaignForm from "./EditDonationCampaignForm/EditDonationCampaignForm";

const EditDonation = () => {
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
                <EditDonationCampaignForm></EditDonationCampaignForm>
            </div>
        </div>
    );
};

export default EditDonation;