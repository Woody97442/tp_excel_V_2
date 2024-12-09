import * as z from "zod";

export const UserSchema = z.object({
    username: z.optional(z.string()),
    postalCode: z.optional(z.string()),
    gender: z.optional(z.string().nullable()),
    phoneNumber: z.optional(z.string()),
    password: z.union([
        z.string().length(0),
        z.string().min(8, { message: "Minimum 8 caractères requis" })
            .refine(val => /[A-Z]/.test(val), { message: "Doit contenir au moins une majuscule" })
            .refine(val => /[0-9]/.test(val), { message: "Doit contenir au moins un chiffre" })
            .refine(val => /[^a-zA-Z0-9]/.test(val), { message: "Doit contenir au moins un caractère spécial" })
    ]),
    confirm_password: z.string(),
}).refine(data => data.password === data.confirm_password || data.password.length === 0, {
    message: "Les mots de passe ne sont pas identiques",
    path: ["confirm_password"],
});

export const NewPasswordSchema = z.object({
    password: z.string().min(8, { message: "Minimum 8 caractères requis" })
        .refine(val => /[A-Z]/.test(val), { message: "Doit contenir au moins une majuscule" })
        .refine(val => /[0-9]/.test(val), { message: "Doit contenir au moins un chiffre" })
        .refine(val => /[^a-zA-Z0-9]/.test(val), { message: "Doit contenir au moins un caractère spécial" })
})

export const ResetSchema = z.object({
    email: z.string().email({
        message: "Un email est requis",
    })
})

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Un email est requis",
    }),
    password: z.string().min(1, { message: "Un mot de passe est requis" }),
    code: z.optional(z.string()),
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Un email valable est requis",
    }),
    name: z.string().min(3, { message: "Un nom d'utilisateur est requis" }),

    password: z.string().min(6, { message: "" })
        .refine(val => /[A-Z]/.test(val), { message: "" })
        .refine(val => /[0-9]/.test(val), { message: "" })
        .refine(val => /[^a-zA-Z0-9]/.test(val), { message: "" }),

    confirm_password: z.string(),
}).refine(data => data.password === data.confirm_password, {
    message: "Les mots de passe ne sont pas identiques",
    path: ["confirm_password"],
})