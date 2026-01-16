import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// On définit les routes publiques (accessibles sans compte)
const isPublicRoute = createRouteMatcher([
    '/',
    '/pricing',
    '/legal(.*)',
    '/api/analyze', // On laisse l'API ouverte pour l'instant (on la sécurisera après)
    '/sign-in(.*)',
    '/sign-up(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
    if (!isPublicRoute(req)) {
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};