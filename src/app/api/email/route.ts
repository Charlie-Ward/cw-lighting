import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
    const { email, name, message, phone } = await request.json();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.MY_EMAIL,
            pass: process.env.MY_PASSWORD,
        },
    });

    const mailOptions: Mail.Options = {
        from: process.env.MY_EMAIL,
        to: 'charlie@cwlx.co.uk',
        cc: email,
        subject: `Message from ${name} (${email}, ${phone})`,
        text: message,
    };

    const sendMailPromise = () =>
        new Promise<string>((resolve, reject) => {
            transport.sendMail(mailOptions, function (err) {
                if (!err) {
                    resolve('Email sent')
                } else {
                    reject(err.message)
                }
            })
        })
    
    try {
        await sendMailPromise()
        return NextResponse.json({ message: 'Email Sent' });
    } catch (err) {
        return NextResponse.json({ error: err}, { status: 500})
    }
}