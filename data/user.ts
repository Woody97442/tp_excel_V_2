import { prisma } from "@/prisma/prismaClient";
import { User } from "@/prisma/user/types";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                Account: true
            }
        })
        return user
    } catch {
        return null
    }
}

export const getUserById = async (id: string): Promise<User | null> => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                Account: true,
            }
        })
        return user as User
    } catch {
        return null
    }
}