import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import { Helmet } from "react-helmet-async";

const CreateDonationCampaign = () => {
    return (
        <div>
            <Helmet>
                <title>Feliz Tails - Create Donation Campaign</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="Create Donation Campaign"
                subHeading="Provide detailed information about your pet to help potential adopters make an informed decision"
            ></SectionTitleWithBGPhoto>
        </div>
    );
};

export default CreateDonationCampaign;