import { NextResponse } from "next/server";
import prisma from "@/db/prisma";
import bcrypt from 'bcrypt'


async function resetpassword(req) {
    const { token, password } = await req.json()

    try {
        const user = await prisma.user.findFirst({
            where: {
                passwordResetToken: token
            }
        })
        if (!user) {
            return NextResponse.json({ "message": "Invalid Link" }, { "status": 501 })
        }
        const currentdate = Date.now();
        const resetPasswordExpiryTimestamp = Date.parse(user.passwordResetTokenExpiry);
        if (currentdate > resetPasswordExpiryTimestamp) {
            await prisma.user.update({
                where: {
                    email: user.email
                },
                data: {
                    passwordResetToken: null,
                    passwordResetTokenExpiry: null,
                }
            })
            return NextResponse.json({ "message": "Link has been expired" }, { "status": 501 });
        }

        const hashedpass = await bcrypt.hash(password, 10)
        await prisma.user.update({
            where: {
                email: user.email
            },
            data: {
                password: hashedpass,
                passwordResetToken: null,
                passwordResetTokenExpiry: null,
            }
        })
        return NextResponse.json({ "message": "Password Updated Successfully" }, { "status": 200 })
    } catch (error) {
        return NextResponse.json({ "message": error.message }, { "status": 501 })
    } finally {
        await prisma.$disconnect()
    }
}






export { resetpassword as POST }