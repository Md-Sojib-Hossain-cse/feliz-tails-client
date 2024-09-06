import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/Components/ui/input";
import { DialogDescription } from "@radix-ui/react-dialog";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const PetDetailsModal = ({ petDetails }) => {
    const { _id, name, image, age, location, date, category } = petDetails;
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive">Adopt</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <img src={image} alt="" className="w-36 h-36 mx-auto object-cover rounded-full"/>
                    <DialogTitle>Adoption Form of : {name}</DialogTitle>
                    <DialogDescription>
                        <p><small>id:{_id}</small></p>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-4 gap-2 items-center">
                            <label htmlFor="name">Pet Name:</label>
                            <Input defaultValue={name} {...register("name")} className="col-span-3" readOnly disabled />
                        </div>
                        <input {...register("exampleRequired", { required: true })} />
                        {errors.exampleRequired && <span>This field is required</span>}
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