
import nodemailer from 'nodemailer';

export async function sendMail ({
   
    to,
    subject,
    body,
    name,
}) {

    const smtpEmail = process.env.SMTP_EMAIL;
    const smtpPassword = process.env.SMTP_PASSWORD;


    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: smtpEmail,
            pass: smtpPassword
        }
    });
    try {
        const testResult = await transport.verify();

        console.log(testResult);

    }
    catch (error) {
        console.log(error);
    }
    try {
        const sendResult = await transport.sendMail({
            from: smtpEmail,
            to,
            subject,
            html: body
        });

        console.log(sendResult);



    }
    catch (error) {
        console.log(error);
    }

}