// prisma.ts

import { PrismaClient } from '@prisma/client';

let prisma = PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    // In development, use a global variable to avoid reconnecting on each Hot Module Replacement (HMR) update
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

export default prisma;
