import paymentModel from '../models/payment.model.js'
import userModel from "../models/user.model.js";
import AppError from "../utils/error.utils.js";
import { razorpay } from "../server.js";
import crypto from 'crypto';
import Payment from '../models/payment.model.js';


// get Razorpay api key 
export const getRazorPayApiKey = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: "Razorpay API Key",
            key: process.env.RAZORPAY_KEY_ID
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }

}

//  buy subscription 
export const buySubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await userModel.findById(id);

        if (!user) {
            return next(new AppError("Unauthorized, please login"));
        }

        if (user.role === "ADMIN") {
            return next(new AppError("Admin cannot purchase a subscription", 400));
        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            total_count: 1
        });

        // update subscription model with subscription id 
        // step 2 : change user subscription status

        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;

        await user.save({validateBeforeSave: false});

        res.status(200).json({
            success: true,
            message: "Subscribed Successfully",
            subscription_id: subscription.id,
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};

//  verfiy subscription 
export const verifySubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { razorpay_payment_id, razorpay_signature, razorpay_subscription_id } = req.body;

        const user = await userModel.findById(id);
        if (!user) {
            return next(new AppError('Unauthorised, please login', 400))
        }

        // Getting the subscription ID from the user object
        const subscriptionId = user.subscription.id;
        // subscriptionId should be one which we saved in db

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id}|${subscriptionId}`)
            .digest('hex');

        //checking the generated signature and signature received from the frontend is the same or not
        if (generatedSignature !== razorpay_signature) {
            return next(new AppError("Payment Not Verified, please try again", 400))
        }

        // if matched so create payment record
        await paymentModel.create({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id
        })

        // update user record
        user.subscription.status = 'active';
        await user.save({validateBeforeSave: false});

        res.status(200).json({
            success: true,
            message: "Payment Varified Successfully"
        })
    } catch (e) {
        return next(new AppError(e.message, 500))
    }
}

// cancel the subscription 
export const cancelSubscription = async (req, res, next) => {
    const { id } = req.user;

    const user = await userModel.findById(id);

    if (user.role === 'ADMIN') {
        return next(
            new AppError('Admin does not need to cannot cancel subscription', 400)
        );
    }

    const subscriptionId = user.subscription.id;

    try {
        const subscription = await razorpay.subscriptions.cancel(
            subscriptionId
        );

        
        user.subscription.status = subscription.status;

        // save 
        await user.save();
    } catch (error) {
        return next(new AppError(error.error.description, error.statusCode));
    }

    // Finding the payment using the subscription ID
  const payment = await Payment.findOne({
    razorpay_subscription_id: subscriptionId,
  });

  // Getting the time from the date of successful payment (in milliseconds)
  const timeSinceSubscribed = Date.now() - payment.createdAt;

  // refund period which in our case is 14 days
  const refundPeriod = 14 * 24 * 60 * 60 * 1000;

  // Check if refund period has expired or not
  if (refundPeriod <= timeSinceSubscribed) {
    return next(
      new AppError(
        'Refund period is over, so there will not be any refunds provided.',
        400
      )
    );
  }

  // If refund period is valid then refund the full amount that the user has paid
  await razorpay.payments.refund(payment.razorpay_payment_id, {
    speed: 'optimum', // This is required
  });

  user.subscription.id = undefined; // Remove the subscription ID from user DB
  user.subscription.status = undefined; // Change the subscription Status in user DB

  await user.save();
  await payment.remove();

  // Send the response
  res.status(200).json({
    success: true,
    message: 'Subscription canceled successfully',
  });

    // TODO: check all refund period time and etc 
}

// all payments
export const allPayments = async (req, res, next) => {
    try {
        const { count, skip } = req.query;

        // finding all subscriptions from razorpay
        const subscriptions = await razorpay.subscriptions.all({
            count: count ? count : 10,
            skip: skip ? skip : 0,
        });
        // monthly names
        const monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
        ];

        // final months
        const finalMonths = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
        };

        const monthlyWisePayments = subscriptions.items.map((payment)=>{
            // payment.start_at which is in unix time, so converting it to Human readable format using Date()
            const monthsInNumbers = new Date(payment.start_at * 1000);

            return monthNames[monthsInNumbers.getMonth()]
        });

        monthlyWisePayments.map((month)=>{
            Object.keys(finalMonths).forEach( (objMonth)=>{
                if(month === objMonth){
                    finalMonths[month] +=1
                }
            })
        })

        const monthlySalesRecord = [];

        Object.keys(finalMonths).forEach((monthName)=>{
            monthlySalesRecord.push(finalMonths[monthName]);
        })

        res.status(200).json({
            success: true,
            message: 'All Payments',
            subscriptions,
            finalMonths,
            monthlySalesRecord 
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};
