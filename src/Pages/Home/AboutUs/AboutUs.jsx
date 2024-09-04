import SectionTitle from "@/Components/SectionTitle/SectionTitle";

const AboutUs = () => {
    return (
        <section className=" mt-12 md:mt-16 lg:mt-24 xl:mt-32 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            <div className="relative px-4 md:px-6 lg:px-12 xl:px-24 flex justify-center items-center md:pl-8">
                <div className="absolute h-full w-full -z-10 -top-4 -left-1 md:top-12 md:left-1 lg:top-10 lg:left-0 xl:top-16 xl:left-0">
                    <img src="https://i.ibb.co/w6YNfpM/yellow-bg.png" alt="yellow-bg" className="w-2/3 mx-auto" />
                </div>
                <img src="https://i.ibb.co/SNRNjfW/awesom-cat.png" alt="" className="w-1/2 md:w-7/12 lg:w-8/12 xl:w-10/12 mx-auto " />
            </div>
            <div className="flex flex-col justify-center items-center">
                <SectionTitle
                    heading="Who We Are"
                    subHeading="Connecting loving homes with pets, one adoption at a time.">
                </SectionTitle>
                <div className="px-4 md:px-2 lg:px-2">
                    <p className="mb-3 md:mb-4 lg:mb-5">Our Animal Training Services help your adopted pet adjust smoothly. We provide basic obedience training, behavioral support, and ongoing guidance to ensure a happy transition into their new home.</p>
                    <ul className="list-image-[url(https://i.ibb.co/HzMH1JP/bone-img.png)] list-inside text-sm font-semibold text-[#131313] space-y-1">
                        <li>Pet Training Services</li>
                        <li>Support for New Owners</li>
                        <li>Behavioral Adjustment Help</li>
                        <li>Positive Reinforcement Focus</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;