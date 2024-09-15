import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import { Helmet } from "react-helmet-async";
import CreateDonationCampaignForm from "./CreateDonationCampaignForm/CreateDonationCampaignForm";

const CreateDonationCampaign = () => {
    return (
        <div>
            <Helmet>
                <title>Feliz Tails - Create Donation Campaign</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="Start a New Donation Campaign"
                subHeading="Initiate a fundraising campaign to support pets in need. Share your story, set goals, and inspire others to contribute to a meaningful cause."
            ></SectionTitleWithBGPhoto>
            <div>
                <CreateDonationCampaignForm></CreateDonationCampaignForm>
            </div>
        </div>
    );
};

export default CreateDonationCampaign;