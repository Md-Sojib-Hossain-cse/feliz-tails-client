import { Button } from "@/Components/ui/button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DonationCampaignCard = ({ pets }) => {
    const { _id, petName, petImage, maxDonationAmount , donatedAmount , createdAt} = pets;
    console.log(createdAt.split("T")[0])
    const donatedAmountTill = donatedAmount || 0;
    return (
        <div className="w-full relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="h-64">
                <img className="rounded-t-lg object-cover h-full w-full" src={petImage} alt="" />
            </div>
            <div className="p-5">
                <div className="mb-1">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{petName}</h5>
                </div>
                <div className="mb-4">
                    <p>Max Donation Amount : ${maxDonationAmount}</p>
                    <p>Donated Amount : ${donatedAmountTill}</p>
                    <p>Campaign started : {createdAt.split("T")[0]}</p>
                </div>
                <Button variant="destructive">
                    <Link to={`/donationCampaign/${_id}`}>View Details</Link>
                </Button>
            </div>
        </div>
    );
};

DonationCampaignCard.propTypes = {
    pets: PropTypes.object,
}

export default DonationCampaignCard;