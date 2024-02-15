import { model, Schema } from 'mongoose';

const paymentSchema = new Schema({
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_subscription_id: {
        type: String,
        required: true
    },
    razorpay_signature: { 
        type: String,
        required: true
    }
    // this help us to check status ist payment successful or not 
},
    {
        timestamps: true
    })

const Payment = model("Payments", paymentSchema);

export default Payment