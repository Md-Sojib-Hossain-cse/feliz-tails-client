import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import { Helmet } from "react-helmet-async";

const AdoptionRequest = () => {
    return (
        <div>
            <Helmet>
                <title>Feliz Tails - Adoption Request</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="Adoption Requests"
                subHeading="Review and manage all the adoption requests submitted for your pets. Approve or decline requests and connect with potential adopters to find the perfect home for your pets."
            ></SectionTitleWithBGPhoto>
        </div>
    );
};

export default AdoptionRequest;