import axios from "axios";
import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";
import { Buffer } from "buffer";
import orderModel from "../models/orderModel.js";

import { config } from "../config/config.js";

const MERCHANT_KEY = config.phonepeMerchantKey;
const MERCHANT_ID = config.phonepeMerchantId;

// const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
// const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/status"

const MERCHANT_BASE_URL = `${config.phonepeBaseUrl}/pg/v1/pay`;
const MERCHANT_STATUS_URL = `${config.phonepeBaseUrl}/pg/v1/status`;

const redirectUrl = `${config.backendUrl}/api/payment/status`;

const successUrl = `${config.clientUrls[0]}/profile`;
const failureUrl = `${config.clientUrls[0]}/profile`;

const createOrder = async (req, res) => {
  const { name, mobileNumber, amount } = req.body;
  const transactionId = uuidv4();

  //payment
  const paymentPayload = {
    merchantId: MERCHANT_ID,
    merchantUserId: name,
    mobileNumber: mobileNumber,
    amount: amount * 100,
    merchantTransactionId: transactionId,
    redirectUrl: `${redirectUrl}/?id=${transactionId}`,
    redirectMode: "POST",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };

  const payload = Buffer.from(JSON.stringify(paymentPayload)).toString(
    "base64"
  );
  const keyIndex = 1;
  const string = payload + "/pg/v1/pay" + MERCHANT_KEY;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;

  const option = {
    method: "POST",
    url: MERCHANT_BASE_URL,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
    },
    data: {
      request: payload,
    },
  };
  try {
    const response = await axios.request(option);
    console.log(response.data.data.instrumentResponse.redirectInfo.url);
    res.status(200).json({
      msg: "OK",
      url: response.data.data.instrumentResponse.redirectInfo.url,
    });
  } catch (error) {
    console.log("error in payment", error);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
};

// trans id
// amount
// productId
// userId
// status
// date

// const status = async (req, res) => {
//     const merchantTransactionId = req.query.id;

//     const keyIndex = 1;
//     const string = `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY;
//     const sha256 = crypto.createHash('sha256').update(string).digest('hex');
//     const checksum = sha256 + '###' + keyIndex;

//     const option = {
//         method: 'GET',
//         url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
//         headers: {
//             accept: 'application/json',
//             'Content-Type': 'application/json',
//             'X-VERIFY': checksum,
//             'X-MERCHANT-ID': MERCHANT_ID
//         },
//     };

//     try {
//         const response = await axios.request(option);
//         if (response.data.success === true) {
//             const paymentDetails = response.data.data;

//             // Extract necessary details

//             if(paymentDetails.status !== "SUCCESS"||paymentDetails.amount <= 0||!paymentDetails.userId) {
//                 return res.redirect(failureUrl);
//             }

//             const orderData = {
//                 transactionId: merchantTransactionId,
//                 amount: paymentDetails.amount / 100,  // Convert to normal currency
//                 productId: req.query.productId || "N/A", // Get from frontend
//                 userId: req.query.userId || "N/A",       // Get from frontend
//                 status: "SUCCESS",
//                 date: new Date()
//             };

//             // Save order details in MongoDB
//             const newOrder = new orderModel(orderData);
//             await newOrder.save();

//             return res.redirect(successUrl);
//         } else {
//             return res.redirect(failureUrl);
//         }
//     } catch (error) {
//         console.error("Error in payment status check:", error);
//         return res.status(500).json({ error: "Failed to fetch payment status" });
//     }
// };

const status = async (req, res) => {
  const merchantTransactionId = req.query.id;
  console.log("Merchant Transaction ID:" + merchantTransactionId);
  const keyIndex = 1;
  const string =
    `/pg/v1/status/${MERCHANT_ID}/${merchantTransactionId}` + MERCHANT_KEY;
  console.log("String:" + string);
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;
  const option = {
    method: "GET",
    url: `${MERCHANT_STATUS_URL}/${MERCHANT_ID}/${merchantTransactionId}`,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": MERCHANT_ID,
    },
  };

  try {
    const response = await axios.request(option);
    // console.log("Status Response" + response);
    if (response.data.success === true) {
      console.log(response.data);

      return res.redirect(successUrl);
    } else {
      return res.redirect(failureUrl);
    }
  } catch (error) {
    console.error("Error in payment status check:", error);
    return res.status(500).json({ error: "Failed to fetch payment status" });
  }
};

export { createOrder, status };
