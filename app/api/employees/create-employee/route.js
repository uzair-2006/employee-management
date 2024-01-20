import { NextResponse } from "next/server";
import prisma from "@/db/prisma";

export async function POST(req) {
    const { name, email, gender, phone, emergencyPhone, salary, address, id } = await req.json()

    try {
        const isEmployeewithEmail = await prisma.employee.findFirst({
            where: {
                email: email
            }
        })
        if (isEmployeewithEmail) {
            return NextResponse.json({ "message": "Employee with this email already exists", "success": false }, { "status": 201 })
        }
        const isEmployeewithPhone = await prisma.employee.findFirst({
            where: {
                phoneNumber: phone
            }
        })
        if (isEmployeewithPhone) {
            return NextResponse.json({ "message": "Employee with this PhoneNumber already exists", "success": false }, { "status": 201 })
        }

        const employee = await prisma.employee.create({
            data: {
                name, basicSalary: salary, creatorId: id, address, gender, emergencyContactNumber: emergencyPhone, phoneNumber: phone, email
            }
        })
        return NextResponse.json({ "message": "Employee Created Succussfully", "data": employee, "success": true }, { "status": 201 })
    } catch (err) {
        return NextResponse.json({ "message": err.message }, { "status": 501 })
    } finally {
        await prisma.$disconnect()
    }
}