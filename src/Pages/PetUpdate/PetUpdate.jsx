import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import { Helmet } from "react-helmet-async";
import UpdateAPetForm from "./UpdateAPetForm/UpdateAPetForm";

const PetUpdate = () => {
    return (
        <div>
            <Helmet>
                <title>Feliz Tails - Update a Pet</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="Update Pet Information"
                subHeading="Edit and keep your pet's profile up-to-date to ensure accurate details for potential adopters."
            ></SectionTitleWithBGPhoto>
            <div>
                <UpdateAPetForm></UpdateAPetForm>
            </div>
        </div>
    );
};

export default PetUpdate;