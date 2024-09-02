import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button"

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Feliz Tails - Home</title>
            </Helmet>
            <Button>Click me</Button>
            Home page
        </div>
    );
};

export default Home;