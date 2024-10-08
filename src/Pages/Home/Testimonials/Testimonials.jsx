import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SectionTitle from '@/Components/SectionTitle/SectionTitle';
import { useEffect, useState } from "react";
import TestimonialCard from "./TestimonialCard/TestimonialCard";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const Testimonials = () => {
    const [reviews , setReviews] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get("/reviews")
            .then(res => {
                setReviews(res.data);
            })
    } , [axiosPublic])

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 6000,
        autoplaySpeed: 0,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <section className='mt-6 md:mt-8 lg:mt-12 xl:mt-16'>
            <SectionTitle
                heading='Happy Tails'
                subHeading='Hear from adopters about their happy experiences.'
            ></SectionTitle>
            <div className="slider-container px-8 md:px-10 lg:px-12 xl:px-24 mt-4 md:mt-6 lg:mt-8">
                <Slider {...settings}>
                    {
                        reviews.map(data => <TestimonialCard key={data._id} data={data}></TestimonialCard>)
                    }
                </Slider>
            </div>
        </section>
    );
};

export default Testimonials;