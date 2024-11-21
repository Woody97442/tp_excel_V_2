import { ProductType } from "@/components/page/type";
import { prisma } from "@/prisma/prismaClient";

// Retourne tous les produits
export const getProducts = async (): Promise<ProductType[] | null> => {
    try {
        const products = await prisma.product.findMany()

        return products
    } catch {
        console.log("Une erreur s'est produite lors de la recherche des produits");
        return null
    }
}