import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import useAuth from '@/hooks/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from '../CheckOutForm/CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_publishableKeyPaymentGateway);

const DonationCampaignModal = ({ campaignDetails , refetch}) => {
    const { user } = useAuth();
    const {isPaused} = campaignDetails;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="destructive" disabled={!user || isPaused === "true"}>Donate Now</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Elements stripe={stripePromise}>
                    <CheckOutForm campaignDetails={campaignDetails} refetch={refetch}/>
                </Elements>
            </DialogContent>
        </Dialog>
    );
};
DonationCampaignModal.propTypes = {
    campaignDetails: PropTypes.object,
    refetch : PropTypes.func,
}

export default DonationCampaignModal;