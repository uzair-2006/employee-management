import { NextResponse } from "next/server";
import prisma from "@/db/prisma";


export async function POST(req) {
    try {
        const id = await req.json();

        const employees = await prisma.employee.findMany({
            where: {
                creatorId: id
            }
        });
        if (employees.length === 0) {
            return NextResponse.json({ "message": "No employees found" }, { "status": 200 });
        }

        return NextResponse.json({ "data": employees }, { "status": 200 });

    } catch (err) {
        return NextResponse.json({ "message": err.message }, { "status": 501 });
    } finally {
        await prisma.$disconnect();
    }
}
