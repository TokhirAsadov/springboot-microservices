import React, { createContext, useContext } from 'react';
import Keycloak from 'keycloak-js';

const KeycloakContext = createContext(null);

export const KeycloakProvider = ({ children }) => {
    const keycloak = new Keycloak( {
        url: "http://localhost:8181/",
        realm: "spring-microservices-security-realm",
        clientId: "react-client",
        redirectUri: "http://localhost:3000/"
    });

    return (
        <KeycloakContext.Provider value={keycloak}>
            {children}
        </KeycloakContext.Provider>
    );
};

export const useKeycloak = () => {
    return useContext(KeycloakContext);
};
