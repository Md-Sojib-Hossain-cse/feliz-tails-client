import SectionTitleWithBGPhoto from "@/Components/SectionTitleWithBGPhoto/SectionTitleWithBGPhoto";
import { Helmet } from "react-helmet-async";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get("/users")
            return res.data;
        }
    })

    const makeAdmin = async (id) => {
        const res = await axiosSecure.patch(`/users/${id}`)
        if (res.data.modifiedCount) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "User Role Changed As admin",
                showConfirmButton: false,
                timer: 1500
            });
            refetch();
        }
    }


    return (
        <div>
            <Helmet>
                <title>Feliz Tails - Users</title>
            </Helmet>
            <SectionTitleWithBGPhoto
                heading="All Active Users"
                subHeading="Efficiently manage user accounts, roles, and permissions from this centralized dashboard. View user details, update information, and oversee account activity to ensure a smooth and secure system operation."
            ></SectionTitleWithBGPhoto>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Profile Picture</TableHead>
                            <TableHead>Make Admin</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            users.map(user => <TableRow key={user._id}>
                                <TableCell>{user?.name}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell><img src={user?.image} alt="" className="w-12 h-12 rounded-lg bg-gray-500" /></TableCell>
                                <TableCell>
                                    {
                                        user?.role === "Admin" ? "Admin" : <button disabled={user?.role === "Admin"} onClick={() => makeAdmin(user?._id)} className="px-3 py-2 rounded-md text-green-600 hover:bg-green-100 hover:text-green-900 border border-green-400 bg-green-200">Make Admin</button>
                                    }
                                </TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default Users;