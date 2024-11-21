import { EmployeeType } from "@/components/page/type";
import { prisma } from "@/prisma/prismaClient";

export const getEmployees = async (): Promise<EmployeeType[] | null> => {
    try {
        const employees = await prisma.employee.findMany()

        return employees
    } catch {
        console.log("Une erreur s'est produite lors de la recherche des employés");
        return null
    }
}