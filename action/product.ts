"use server";
import { CreatedProductType } from "@/components/page/type";
import { prisma } from "@/prisma/prismaClient";

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
