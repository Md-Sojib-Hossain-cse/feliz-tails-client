import { Button } from "@/Components/ui/button";
import PropTypes from "prop-types";

const PetListingCard = ({pets}) => {
    const {image , name , age , location} = pets;

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="h-64">
                <img className="rounded-t-lg object-cover h-full w-full" src={image} alt="" />
            </div>
            <div className="p-5">
                <div className="mb-1">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                    <p><small>Location : {location}</small></p>
                </div>
                <p className="mb-4">Age : {age}</p>
                <Button type="submit" variant="destructive">View Details</Button>
            </div>
        </div>
    );
};

PetListingCard.propTypes = {
    pets : PropTypes.object,
}

export default PetListingCard;