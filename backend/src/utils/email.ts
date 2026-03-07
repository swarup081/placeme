import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const defaultFrom = process.env.EMAIL_FROM || "Acme <onboarding@resend.dev>";

export const sendEmail = async (to: string, subject: string, htmlMessage: string) => {
    return await resend.emails.send({
        from: defaultFrom,
        to: [to],
        subject,
        html: htmlMessage,
    });
};