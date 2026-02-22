import { redirect } from "react-router";
import { initAuth } from "@/context/auth";

export async function protectedLoader() {
    const { authenticated } = await initAuth();
    if (!authenticated) {
        const currentUrl = window.location.href;
        throw redirect(`/login?redirectUri=${encodeURIComponent(currentUrl)}`);
    }   

    return null;
}