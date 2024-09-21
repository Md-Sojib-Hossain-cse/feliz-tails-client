import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="min-h-screen w-full max-w-screen-xl mx-auto flex flex-col justify-center items-center gap-2">
            <img src="https://i.ibb.co.com/g4K5Wcg/dogcycling.gif" alt="" className="w-2/3 max-w-96 mx-auto"/>
            <Link to="/" className="px-3 py-2 rounded-lg border border-green-400 text-green-400 hover:bg-green-400 hover:text-white">Go to Home</Link>
        </div>
    );
};

export default ErrorPage;