import { Helmet } from "react-helmet-async";
import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import CallToAction from "../CallToAction/CallToAction";
import Category from "../Category/Category";
import Testimonials from "../Testimonials/Testimonials";
import Faq from "../FAQ/Faq";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Feliz Tails - Home</title>
            </Helmet>
            <Banner></Banner>
            <Category></Category>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
            <Testimonials></Testimonials>
            <Faq></Faq>
        </div>
    );
};

export default Home;