import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/db/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials
                try {
                    const user = await prisma.user.findFirst({
                        where: {
                            email: email
                        }
                    });
                    if (!user) {
                        return null
                    }
                    const passwordMatched = await bcrypt.compare(password, user.password);
                    if (!passwordMatched) {
                        return null
                    } else {

                        return user;
                    }

                } catch (error) {
                    return NextResponse.json({ "message": error.message, "type": "failiure" }, { "status": 501 })
                } finally {
                    await prisma.$disconnect();
                }

            }
        })
    ],
    callbacks: {
        async jwt({ token, user, session }) {
            if (user) {
                return {
                    ...token,
                    id: user.id,

                }
            }
            return token
        },
        async session({ token, user, session }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                }

            }
        },
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "employee-management-green.vercel.app/",
    }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };