import { Button } from "@/Components/ui/button";
import { DialogFooter } from "@/Components/ui/dialog";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import PropTypes from "prop-types";
import { DialogTitle } from "@radix-ui/react-dialog";
import useAuth from "@/hooks/useAuth";


const CheckOutForm = ({ campaignDetails }) => {
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId , setTransactionId] = useState("");
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { maxDonationAmount, donatedAmount } = campaignDetails;
    const remainingAmount = parseInt(maxDonationAmount) - (parseInt(donatedAmount) || 0);


    const handlePaymentIntent = (e) => {
        e.preventDefault();
        const donationAmount = e.target.value || 1;
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
            if(paymentIntent.status === "succeeded"){
                setTransactionId(paymentIntent.id)
            }
        }
    }

    console.log(remainingAmount)
    return (
        <div>
            <DialogTitle className="w-full">
                <div className="w-full">
                    <label htmlFor="donateAmount">Donation Amount :</label>
                    <input onChange={handlePaymentIntent} type="number" name='donateAmount' id='donateAmount' placeholder='' min="1" max={remainingAmount} className="w-full rounded-sm" defaultValue={remainingAmount} />
                </div>
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
                    <Button type="submit" disabled={!stripe || !clientSecret} variant="destructive">Pay</Button>
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