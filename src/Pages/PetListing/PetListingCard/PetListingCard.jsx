import PropTypes from "prop-types";
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom";
import { Button } from "@/Components/ui/button";

const PetListingCard = ({ pets }) => {
    const { _id, image, name, age, location, date, status } = pets;

    return (
        <div className="w-full relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="h-64">
                <img className="rounded-t-lg object-cover h-full w-full" src={image} alt="" />
            </div>
            <div className="p-5">
                <div className="mb-1">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    <p><small>Location : {location}</small></p>
                </div>
                <div className="mb-4">
                    <p>Age : {age}</p>
                    <p>Listing Date : {date}</p>
                </div>
                <Button variant="destructive">
                    <Link to={`/petDetails/${_id}`}>View Details</Link>
                </Button>
            </div>
            <Badge variant="secondary" className="absolute top-4 right-0 rounded-r-none">{status}</Badge>
        </div>
    );
};

PetListingCard.propTypes = {
    pets: PropTypes.object,
}

export default PetListingCard;