import keycloak from "@/keycloak";

let authenticated = false;

let initPromise : Promise<{authenticated: boolean, keycloak: any}> | null = null;

export async function initAuth() {
    if (initPromise) return initPromise;
    
    initPromise = keycloak.init({
        onLoad: "login-required",
    }).then((authenticated: boolean) => {
        return { authenticated: !!authenticated, keycloak };
    }).catch((error: any) => {
        console.error('Keycloak init failed:', error);
        initPromise = null;
        throw error;
    });
    
    return initPromise;
}


export function isAuthenticated() {
    return authenticated;
}

export function login(redirectUri: string) {
    keycloak.login({ redirectUri });
}

export function logout(redirectUri: string) {
    keycloak.logout({ redirectUri });
}

export async function getToken() {
    await keycloak.updateToken(30)  
    return keycloak.token
}


export function getUserName() {
    return keycloak.tokenParsed?.preferred_username || null;
}

export function getRoles() {
    return keycloak.tokenParsed?.realm_access?.roles || [];
}

export function hasRole(role: string) {
    const roles = getRoles();
    return roles.includes("ROLE_" + role.toLocaleUpperCase());
}