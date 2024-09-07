import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/Components/ui/input";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { DialogDescription } from "@radix-ui/react-dialog";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const PetDetailsModal = ({ petDetails }) => {
    const { _id, name, image } = petDetails;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const onSubmit = (data) => {
        const userName = user?.displayName || data?.name;
        const userEmail = user?.email || data?.eamil;
        const phone = data?.phone;
        const address = data?.address;
        const adoptRequestInfo = {
            petInfo: {
                ...petDetails
            },
            userInfo: {
                userName,
                userEmail,
                phone,
                address
            }
        }
        axiosSecure.post("/adoption-request", adoptRequestInfo)
                    .then((res => {
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "center-center",
                                icon: "success",
                                title: "Your request has been submitted",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                        if(res?.data?.message){
                            Swal.fire({
                                position: "center-center",
                                icon: "info",
                                title: res?.data?.message,
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    }))
                    .catch(() => {
                        Swal.fire({
                            position: "center-center",
                            icon: "error",
                            title: "An Error occurred . cannot submit your request right now.",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    })
        
    };

    return (
        <Dialog>
            <DialogTrigger asChild disabled={!user}>
                <Button variant="destructive">Adopt</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <img src={image} alt="" className="w-36 h-36 mx-auto object-cover rounded-full" />
                    <DialogTitle>Adoption Form of : {name}</DialogTitle>
                    <DialogDescription>
                        <p><small>id:{_id}</small></p>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <label htmlFor="userName">Username:</label>
                            <Input defaultValue={user?.displayName} {...register("userName")} className="col-span-3" readOnly />
                        </div>
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <label htmlFor="email">Email:</label>
                            <Input defaultValue={user?.email} {...register("email")} className="col-span-3" readOnly />
                        </div>
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <label htmlFor="phone">Phone:</label>
                            <Input type="number" {...register("phone", { required: true })} className="col-span-3" />
                        </div>
                        {errors.phone && <span>This field is required</span>}
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <label htmlFor="address">Address:</label>
                            <Input type="text" {...register("address", { required: true })} className="col-span-3" />
                        </div>
                        {errors.address && <span>This field is required</span>}
                        <Button type="submit">Submit</Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

PetDetailsModal.propTypes = {
    petDetails: PropTypes.object,
}

export default PetDetailsModal;