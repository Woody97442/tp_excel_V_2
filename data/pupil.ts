import { PupilType } from "@/components/page/type";
import { prisma } from "@/prisma/prismaClient";

export const getPupils = async (): Promise<PupilType[] | null> => {
    try {
        const pupils = await prisma.pupil.findMany()

        return pupils
    } catch {
        console.log("Une erreur s'est produite lors de la recherche des éleves");
        return null
    }
}