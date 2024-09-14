import PropTypes from "prop-types";
import { FaPaw } from "react-icons/fa6";
import "./SectionTitleWithBGPhoto.css";


const SectionTitleWithBGPhoto = ({ heading, subHeading }) => {
    return (
        <div className="relative">
            <div className="bg-image w-full text-left px-2 md:px-4 lg:px-6 py-3 md:py-6 lg:py-8  mb-6 md:mb-8 lg:mb-10">
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
            <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-4xl uppercase font-bold">{heading}</h2>
            <p className="text-sm lg:text-base italic mb-1 w-3/4 max-w-[600px]">{subHeading}</p>
        </div>
        </div>
    );
};

SectionTitleWithBGPhoto.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
}

export default SectionTitleWithBGPhoto;