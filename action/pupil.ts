"use server";
import { CreatedPupilType } from "@/components/page/type";
import { prisma } from "@/prisma/prismaClient";

export const CreatePupil = async (
    data: CreatedPupilType
) => {
    try {
        if (data.name && data.age && data.gender && data.grade) {

            const newPupil = await prisma.pupil.create({
                data: {
                    name: data.name,
                    age: data.age,
                    gender: data.gender,
                    grade: data.grade,
                    isPaymentPhoto: data.isPaymentPhoto,
                    monthPayment: data.monthPayment ? data.monthPayment : null,
                },
            });
            return {
                success: "Elève ajoute avec success", newPupil
            }
        }
    } catch (error) {
        return {
            error: "Une erreur s'est produite lors de la création de l'Elève"
        }
    }
};

export const deletePupil = async (id: number) => {
    try {
        await prisma.pupil.delete({
            where: {
                id: id,
            },
        });
        return {
            success: "Elève supprime avec success"
        };
    } catch (error) {
        console.log(error);
        return {
            error: "Une erreur s'est produite lors de la suppression de l'Elève"
        };
    }
}