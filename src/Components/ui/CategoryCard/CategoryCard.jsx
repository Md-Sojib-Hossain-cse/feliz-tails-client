import PropTypes from "prop-types";

const CategoryCard = ({img , title , description}) => {
    return (
        <div className="w-full flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-3 hover:bg-gray-100 hover:scale-90 transition delay-150">
            <a href="#">
                <img className="rounded-t-lg w-44 mx-auto md:p-4" src={img} alt="category image" />
            </a>
            <div className="flex flex-col gap-2 items-start justify-center">
                <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </a>
                <p className="text-sm md:text-base text-gray-900 dark:text-white">{description}</p>
            </div>
        </div>
    );
};

CategoryCard.propTypes = {
    img : PropTypes.string,
    title : PropTypes.string,
    description : PropTypes.string,
}

export default CategoryCard;