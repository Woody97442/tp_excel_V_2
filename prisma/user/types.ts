import { $Enums, Account } from "@prisma/client";

export type User = {
    id: string;
    name: string | null;
    username: string | null;
    email: string | null;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
    gender: String | null;
    postalCode: String | null;
    phoneNumber: String | null;
    role: $Enums.UserRole;
    isTwoFactorEnabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    Account: Account | null;
} | null