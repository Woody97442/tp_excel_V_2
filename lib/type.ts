import { Gender, Months } from "@prisma/client";

export interface ProductType {
    id: number;
    name: string;
    numberPurchases: string | null;
    numberSales: string | null;
    pahtnet: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatedProductType {
    name: string;
    numberPurchases: string | null;
    numberSales: string | null;
    pahtnet: string;
}


export interface PupilType {
    id: number;
    name: string;
    age: string;
    gender: Gender;
    grade: string | null;
    isPaymentPhoto: boolean;
    monthPayment: Months | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatedPupilType {
    name: string;
    age: string;
    gender: Gender;
    grade: string | null;
    isPaymentPhoto: boolean;
    monthPayment: Months | null;
}

export interface EmployeeType {
    id: number;
    name: string;
    firstName: string;
    gender: Gender;
    age: string;
    dateOfIntegration: Date;
    qualification: string;
    site: string;
    grossSalary: string;
    hoursOfAbsence: string;

    createdAt: Date;
    updatedAt: Date;
}

export interface CreatedEmployeeType {
    name: string;
    firstName: string;
    gender: Gender;
    age: string;
    dateOfIntegration: Date;
    qualification: string;
    site: string;
    grossSalary: string;
    hoursOfAbsence: string;
}