import { Button } from "@/Components/ui/button";
import { DialogFooter } from "@/Components/ui/dialog";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import PropTypes from "prop-types";
import { DialogTitle } from "@radix-ui/react-dialog";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import moment from "moment";
import Swal from "sweetalert2";


const CheckOutForm = ({ campaignDetails }) => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const [restrictDonationAmount , setRestrictDonationAmount] = useState(1);
    const { _id } = campaignDetails;
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { maxDonationAmount, donatedAmount } = campaignDetails;
    const remainingAmount = parseInt(maxDonationAmount) - (parseInt(donatedAmount) || 0);


    const handlePaymentIntent = (e) => {
        e.preventDefault();
        const donationAmount = e.target.value || 1;
        setRestrictDonationAmount(donationAmount)
        if(restrictDonationAmount <= 0 || restrictDonationAmount > 1000){
            return;
        }
        axiosSecure.post("/create-payment-intent", { donationAmount: donationAmount })
            .then(res => {
                console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('[error]', error)
            setError(error.message)
        }
        else {
            console.log('[paymentMethod]', paymentMethod)
            setError("")
        }


        //confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayName || "anonymous",
                    email: user?.email || "anonymous",
                },
            }
        })

        if (confirmError) {
            console.log("confirm error", confirmError)
            setError(confirmError)
        }
        else {
            console.log("payment intent", paymentIntent)
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id)
                const donationDetails = {
                    transactionId: paymentIntent.id,
                    amount: parseInt(paymentIntent.amount / 100),
                    campaignId: _id,
                    donatorName: user?.displayName || "anonymous",
                    donatorEmail: user?.email || "anonymous",
                    date: moment().format('L')
                }
                axiosPublic.patch(`/donation-campaign/${_id}`, donationDetails)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Thanks for your donation.",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }

    return (
        <div>
            <DialogTitle className="w-full">
                <div className="w-full">
                    <label htmlFor="donateAmount">Donation Amount :</label>
                    <input onChange={handlePaymentIntent} type="number" name='donateAmount' id='donateAmount' placeholder='' min="1" minLength="1" maxLength="4" max={remainingAmount} className="w-full rounded-sm" defaultValue={remainingAmount} />
                </div>
                <p className="text-green-600"><small>One Time Donation limit is $1 to $1000</small></p>
            </DialogTitle>
            <form onSubmit={handleSubmit} className="space-y-3 py-6">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <DialogFooter>
                    <Button type="submit" disabled={!stripe || !clientSecret || restrictDonationAmount > 1000 || restrictDonationAmount <= 0} variant="destructive">Pay</Button>
                </DialogFooter>
            </form>
            {error ? <p className="text-red-600 text-sm">{error}</p> : ""}
            {transactionId ? <p className="text-green-600 text-sm">{transactionId}</p> : ""}
        </div>
    );
};

CheckOutForm.propTypes = {
    campaignDetails: PropTypes.object,
}

export default CheckOutForm;