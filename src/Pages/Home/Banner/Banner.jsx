import { Button } from "@/Components/ui/button";
import { FaArrowRightLong } from "react-icons/fa6";

const Banner = () => {
    return (
        <div className="relative home-banner-bg min-h-screen w-full">
            <div className="absolute h-full w-full -z-10">
                <img src="https://i.ibb.co/Rzzrx7g/Home-Banner-Dog-Img.jpg" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -z-10 bg-gradient-to-r from-[#13131399] via-[#1313131C] to-[#13131399] h-full w-full"></div>
            <div className="absolute top-2/3 left-4 pr-2 md:left-12 lg:left-24 transform  -translate-y-2/3">
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white font-bold">Ready To Adopt!</h2>
                <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl md:pt-3 lg:pt-4 max-w-[480px] py-4 md:py-6 lg:py-8">Give a loving home to a pet in need. Explore our wide range of adoptable animals and start a new chapter with a loyal companion.</p>
                <Button variant="destructive" className="flex gap-3 hover:bg-slate-300 hover:text-black">Make A Homie <FaArrowRightLong /></Button>
                <img src="https://i.ibb.co/YZPgx28/underline.png" alt="" className="absolute -top-8 md:-top-8 lg:-top-12 xl:-top-16 left-20 md:left-28 lg:left-32 xl:left-44 w-28 md:w-32 lg:w-44 xl:w-56" />
            </div>
        </div>
    );
};

export default Banner;