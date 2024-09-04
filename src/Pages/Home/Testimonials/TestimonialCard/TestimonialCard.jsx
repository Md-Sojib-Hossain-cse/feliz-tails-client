import PropTypes from "prop-types";

const TestimonialCard = ({data}) => {
    const {name , address , review , image} = data;
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-4">
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full object-cover shadow-lg" src={image} alt="User image" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{address}</p>
                <p className="text-base text-gray-500 dark:text-gray-400">{review}</p>
            </div>
        </div>
    );
};

TestimonialCard.propTypes = {
    data : PropTypes.object,
}

export default TestimonialCard;