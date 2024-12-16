"use server";
import { auth } from "@/auth";
import { CreatedProductType } from "@/lib/type";
import { prisma } from "@/prisma/prismaClient";
import { revalidatePath } from "next/cache";

export const CreateProduct = async (
    data: CreatedProductType
) => {
    try {
        if (data.name && data.numberPurchases && data.pahtnet && data.numberSales) {




            const newProduct = await prisma.product.create({
                data: {
                    name: data.name,
                    numberPurchases: normalizedData(data.numberPurchases),
                    numberSales: normalizedData(data.numberSales),
                    pahtnet: normalizedData(data.pahtnet),
                },
            });
            return {
                success: "Produit ajoute avec success", newProduct
            }
        }
    } catch (error) {
        return {
            error: "Une erreur s'est produite lors de la création du produit"
        }
    }
};

export const deleteProduct = async (id: number) => {
    try {
        await prisma.product.delete({
            where: {
                id: id,
            },
        });
        return {
            success: "Produit supprime avec success"
        };
    } catch (error) {
        console.log(error);
        return {
            error: "Une erreur s'est produite lors de la suppression du produit"
        };
    }
}

const normalizedData = (value: string) => {
    return value.replace("€", "").replace(",", ".").replace("-", "").trim();
};

export const EditProduct = async (
    idProduct: number,
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

        if (!idProduct || !editedValue || !type) return;

        const product = await prisma.product.findUnique({
            where: { id: idProduct },
        });

        if (!product) {
            return { error: "Le user n'existe pas !" };
        }

        switch (type) {
            case "name":
                await prisma.product.update({
                    where: { id: idProduct },
                    data: { name: editedValue },
                });
                revalidatePath("/dashboard");
                return { success: "Nom du produit modifie avec success !" };

            case "numberPurchases":
                await prisma.product.update({
                    where: { id: idProduct },
                    data: { numberPurchases: editedValue },
                });
                revalidatePath("/dashboard");
                return { success: "Nombre d'achats du produit modifie avec success !" };

            case "numberSales":
                await prisma.product.update({
                    where: { id: idProduct },
                    data: { numberSales: editedValue },
                });
                revalidatePath("/dashboard");
                return { success: "Nom de vente du produit modifie avec success !" };

            case "pahtnet":
                await prisma.product.update({
                    where: { id: idProduct },
                    data: { pahtnet: editedValue },
                });
                revalidatePath("/dashboard");
                return { success: "Pahtnet du produit modifie avec success !" };

            default:
                return { error: "Type de modification non pris en charge." };
        }
    } catch (error) {
        return {
            error: "Une erreur s'est produite lors de la modification du produit.",
        };
    }
};
