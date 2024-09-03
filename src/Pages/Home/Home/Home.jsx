import { Button } from "@/Components/ui/button";
import { FaHouse } from "react-icons/fa6";

const Home = () => {
    return (
        <div>
            <h1 className="text-3xl"><FaHouse></FaHouse> Home</h1>
            <Button>Click me</Button>
        </div>
    );
};

export default Home;