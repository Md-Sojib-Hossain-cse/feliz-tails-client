import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import AddAPetForm from "./AddAPetForm/AddAPetForm";
import { Helmet } from "react-helmet-async";

const AddAPet = () => {
    return (
        <div>
            <Helmet>
                <title>Feliz Tails - Add a Pet</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="Add Pet for Adoption"
                subHeading="Provide detailed information about your pet to help potential adopters make an informed decision"
            ></SectionTitleWithBGPhoto>
            <div>
                <AddAPetForm></AddAPetForm>
            </div>
        </div>
    );
};

export default AddAPet;