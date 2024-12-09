"use server";

import { prisma } from "@/prisma/prismaClient";
import { auth } from "@/auth";
import { User } from "@/prisma/user/types";

export const GetAllUsers = async () => {

    const session = await auth();

    if (!session) {
        return { error: "Veuillez vous connecter !" };
    }

    const userId = session.user.id;

    if (!userId) {
        return { error: "utilisateur introuvable !" };
    }

    const userIsAdmin = session.user.role === "ADMIN";

    if (!userIsAdmin) {
        return { error: "Vous n'avez pas les droits administrateurs !" };
    }

    const users = await prisma.user.findMany({
        include: {
            Account: true,
        }
    });


    return users as User[];
}


export const DeleteUser = async (id: string) => {

    const session = await auth();

    if (!session) {
        return { error: "Veuillez vous connecter !" };
    }

    const userId = session.user.id;

    if (!userId) {
        return { error: "utilisateur introuvable !" };
    }

    const userIsAdmin = session.user.role === "ADMIN";

    if (!userIsAdmin) {
        return { error: "Vous n'avez pas les droits administrateurs !" };
    }

    await prisma.user.delete({
        where: {
            id: id
        }
    });

    return { success: "Utilisateur supprime avec success" };
}