"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({sender, mail, email, subject}) {
    try {

        console.log( mail, subject);
        await resend.emails.send({
            to: "donvix7@gmail.com", // Removed the leading space
            subject: subject,
            from: "onboarding@resend.dev",
            html: `<p>${mail}</p>`
        });
    } catch (error) {
        console.error("Failed to send email:", error);
        // You might also want to throw the error or handle it in a way that makes sense for your application
    }
}
