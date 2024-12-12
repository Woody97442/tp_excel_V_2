"use server";
import { CreatedEmployeeType } from "@/lib/type";
import { prisma } from "@/prisma/prismaClient";

export const CreateEmployee = async (
    data: CreatedEmployeeType
) => {
    try {
        if (data.name && data.firstName && data.gender && data.age && data.dateOfIntegration && data.qualification && data.site && data.grossSalary && data.hoursOfAbsence) {

            const newEmployee = await prisma.employee.create({
                data: {
                    name: data.name,
                    firstName: data.firstName,
                    gender: data.gender,
                    age: data.age,
                    dateOfIntegration: data.dateOfIntegration,
                    qualification: data.qualification,
                    site: data.site,
                    grossSalary: data.grossSalary,
                    hoursOfAbsence: data.hoursOfAbsence,
                },
            });
            return {
                success: "Employé ajoute avec success", newEmployee
            };
        }
    } catch (error) {
        console.log(error);
        return {
            error: "Une erreur s'est produite lors de l'ajout de l'Employé"
        };
    }
};

export const deleteEmployee = async (id: number) => {
    try {
        await prisma.employee.delete({
            where: {
                id: id,
            },
        });
        return {
            success: "Employé supprime avec success"
        };
    } catch (error) {
        console.log(error);
        return {
            error: "Une erreur s'est produite lors de la suppression de l'Employé"
        };
    }
}