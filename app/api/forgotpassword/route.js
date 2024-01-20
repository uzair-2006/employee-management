import { NextResponse } from "next/server"
import prisma from "@/db/prisma"
import sgMail from '@sendgrid/mail'

async function generateRandomString(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}





async function forgotpassword(req) {
    try {
        const { email } = await req.json();
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (!user) {

            return NextResponse.json({ "message": "This Email is not registered on our Platform" }, { "status": 501 });

        }
        const resetToken = await generateRandomString(100);
        const tokenExpiry = new Date(Date.now() + 3600000);

        await prisma.user.update({
            where: {
                email: email
            },
            data: {
                passwordResetToken: resetToken,
                passwordResetTokenExpiry: tokenExpiry
            }
        });
        const url = `localhost:3000/resetpassword/${resetToken}`;
        const msg = {
            to: email,
            from: 'lightvibes.pk@gmail.com',
            subject: 'Reset Password Link',
            text: 'Below is your Reset Password Link',
            html: url
        };
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.send(msg);
        return new NextResponse(JSON.stringify(user), { "status": 200 });
    } catch (error) {
        return NextResponse.json({ "message": error.message }, { "status": 501 });
    } finally {
        await prisma.$disconnect();
    }
}


export { forgotpassword as POST }