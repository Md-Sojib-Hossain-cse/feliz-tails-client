import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import PetDetailsModal from "./PetDetailsModal/PetDetailsModal";

const PetDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();

    const { data = {} } = useQuery({
        queryKey: ["pet-details"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/PetDetails/${id}`);
            return res.data;
        }
    })


    return (
        <section className="my-6 md:my-8 lg:my-12 xl:my-16 px-4 md:px-6 lg:px-12 xl:px-24">
            <img src={data.image} alt="" className="w-60 h-60 object-cover rounded-full mx-auto border-2 border-gray-100" />
            <div className="mt-6 md:mt-8">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="min-w-20 w-1/2">Pet Name</TableHead>
                            <TableHead className="text-right min-w-20 w-1/2">{data.name}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-normal min-w-20 w-1/2">Age</TableCell>
                            <TableCell className="text-right min-w-20 w-1/2">{data.age}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-normal min-w-20 w-1/2">Location</TableCell>
                            <TableCell className="text-right min-w-20 w-1/2">{data.location}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-normal min-w-20 w-1/2">Listing Date</TableCell>
                            <TableCell className="text-right min-w-20 w-1/2">{data.date}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-normal min-w-20 w-1/2">Category</TableCell>
                            <TableCell className="text-right min-w-20 w-1/2">{data.category}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="font-normal min-w-20 w-1/2">Status</TableCell>
                            <TableCell className="text-right min-w-20 w-1/2">{data.status}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <div className="flex justify-end items-center py-4 lg:py-6">
                    <PetDetailsModal key={data?._id} petDetails={data}></PetDetailsModal>
                </div>
            </div>
        </section>

    );
};

export default PetDetails;