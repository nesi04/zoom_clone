import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/recordings',
    '/personal-room',
    '/previous',
    '/meeting(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
    const { userId, redirectToSignIn } = await auth(); // Extract redirectToSignIn

    if (protectedRoutes(req) && !userId) {
        return redirectToSignIn(); // Redirect unauthenticated users
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and static files
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
