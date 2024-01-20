import { NextResponse } from "next/server";
import prisma from "@/db/prisma";
import bcrypt from 'bcrypt'

export async function POST(req) {
    const { name, email, password } = await req.json();

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });

        if (user) {
            return NextResponse.json({ "message": "User with this email already exist. Please try another one", "type": "failiure" }, { "status": 501 })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                },
            });
            return NextResponse.json({ "message": "User Created Successfully", "type": "success" }, { "status": 200 })
        }
    } catch (error) {
        return NextResponse.json({ "message": error.message, "type": "failiure" }, { "status": 501 })
    } finally {
        await prisma.$disconnect();
    }
}
