import  { UserManager } from "oidc-client";

const settings = {
    authority: "http://localhost:8181/realms/spring-microservices-security-realm",
    redirect_uri: window.location.origin,
    post_logout_redirect_uri: window.location.origin,
    client_id: "react-client",
    scope: "openid profile offline_access",
    response_type: "code",
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
}

const userManager = new UserManager(settings);

export const getUser = () => {
    console.log(userManager.getUser())
    return userManager.getUser();
}

export const login = () => {
    return userManager.signinRedirect();
}

export const logout = () => {
    return userManager.signoutRedirect();
}