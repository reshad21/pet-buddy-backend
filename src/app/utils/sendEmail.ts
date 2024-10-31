import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com.",
        port: 587,
        secure: config.NODE_ENV === 'production', // true for port 465, false for other ports
        auth: {
            user: "rasheduzzamanreshad@gmail.com",
            pass: "tacy qfhl hlqi ohgy",
        },
    });

    await transporter.sendMail({
        from: 'rasheduzzamanreshad@gmail.com', // sender address
        to, // list of receivers
        subject: "Reset your password within 20 minitues!", // Subject line
        text: "", // plain text body
        html, // html body
    });

}