import PropTypes from "prop-types";
import { FaPaw } from "react-icons/fa6";

const SectionTitle = ({ heading, subHeading }) => {
    return (
        <div className="w-3/4 lg:max-w-[500px] xl:max-w-[550px] mx-auto text-center mb-6 md:mb-8 lg:mb-10">
            <div className="flex justify-center items-center gap-1 mb-2">
                <div className="-space-y-4">
                    <p>. . . .</p>
                    <p>. . . .</p>
                </div>
                <FaPaw className="text-[#F03D5E]"></FaPaw>
                <div className="-space-y-4">
                    <p>. . . .</p>
                    <p>. . . .</p>
                </div>
            </div>
            <p className="text-sm lg:text-base italic text-gray-400 mb-1">{subHeading}</p>
            <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl uppercase font-bold">{heading}</h2>
        </div>
    );
};

SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
}

export default SectionTitle;