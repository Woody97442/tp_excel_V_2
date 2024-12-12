"use server";

import { prisma } from "@/prisma/prismaClient";
import { auth } from "@/auth";
import { User } from "@/prisma/user/types";
import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

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

export const EditUser = async (
    idUser: string,
    editedValue: string,
    type: string
) => {
    try {

        const session = await auth();

        if (!session) {
            return { error: "Veuillez vous connecter !" };
        }

        const isAdmin = session.user.role === "ADMIN";

        if (!isAdmin) {
            return { error: "Vous n'avez pas les droits administrateurs !" };
        }

        if (!idUser || !editedValue || !type) return;

        const user = await prisma.user.findUnique({
            where: { id: idUser },
        });

        if (!user) {
            return { error: "Le user n'existe pas !" };
        }

        switch (type) {
            case "username":
                await prisma.user.update({
                    where: { id: idUser },
                    data: { username: editedValue },
                });
                revalidatePath("/dashboard/settings");
                return { success: "Nom d'utilisateur Modifié !" };

            case "password":
                const hashedPassword = await bcrypt.hash(editedValue, 10);
                await prisma.user.update({
                    where: { id: idUser },
                    data: { password: hashedPassword },
                });
                revalidatePath("/dashboard/settings");
                return { success: "Mot de passe Modifié !" };

            case "role":
                await prisma.user.update({
                    where: { id: idUser },
                    data: { role: editedValue as UserRole },
                });
                revalidatePath("/dashboard/settings");
                return { success: "Role Modifié !" };

            default:
                return { error: "Type de modification non pris en charge." };
        }
    } catch (error) {
        return {
            error: "Une erreur s'est produite lors de la modification du produit.",
        };
    }
};