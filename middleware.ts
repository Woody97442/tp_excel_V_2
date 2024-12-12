import authConfig from "@/auth.config"
import NextAuth from "next-auth"
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes"
const { auth } = NextAuth(authConfig)

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    const trustedHosts = ['tp-excel.wbpro.fr'];  // Liste des hôtes de confiance
    const host = req.headers.get('host');  // Récupère l'hôte de la requête

    if (!host || !trustedHosts.includes(host)) {
        // Rediriger ou renvoyer une erreur si l'hôte n'est pas fiable
        return Response.redirect(new URL('/auth/error', nextUrl));
    }

    // Si la requête est pour une route d'authentification API, ne rien faire
    if (isApiAuthRoute) {
        return;
    }

    // Si la requête est pour une route d'authentification et 
    // que l'utilisateur est connecté, rediriger vers la redirection 
    // de connexion par défaut
    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return;
    }

    // Si l'utilisateur n'est pas connecté et que la route n'est pas publique, rediriger vers la page de connexion
    if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
        return Response.redirect(new URL("/auth/login", nextUrl))
    }

    return;
})
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}