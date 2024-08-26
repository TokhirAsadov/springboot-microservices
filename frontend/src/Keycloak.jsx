import Keycloak from 'keycloak-js';
let initOptions = {
    url: "http://localhost:8181/",
    realm: "spring-microservices-security-realm",
    clientId: "react-client",
    redirectUri: "http://localhost:3000/"
}

export const kc = new Keycloak(initOptions);