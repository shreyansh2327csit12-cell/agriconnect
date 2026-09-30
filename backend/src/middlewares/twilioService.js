import {config} from "../config/config.js";
import twilio from 'twilio'

const client = twilio(config.twilioSid, config.twilioAuthToken);

const sendSMS = async (number, message) => {
    try {
        console.log("im under thw water")
        const res = await client.messages.create({
            body: message,
            from:config.twilioNumber,
            to: number
        });
        console.log("working twilio",res.sid);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export default sendSMS;