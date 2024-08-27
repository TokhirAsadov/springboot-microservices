import {useEffect, useState} from "react";

import {httpClient} from "./HttpClient";
import {kc} from "./Keycloak";
import Nav from "./components/Nav";
import axios from "axios";
import {BASE_URL, getHeaders, PRODUCT, TokenType} from "./utills/ServiceUrls";
import Products from "./components/Products";



const App = () =>{
    const [isAuth, setIsAuth] = useState(false);
    const [products,setProducts] = useState([]);

    async function fetchAllProducts(headers) {
        try {
            const response = await axios.get(BASE_URL+PRODUCT.GET_ALL,
                {
                    headers
                });
            setProducts(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    }

    useEffect(() => {
        kc.init({
            onLoad: 'login-required', // Supported values: 'check-sso' , 'login-required'
            checkLoginIframe: true,
            pkceMethod: 'S256'
        }).then((auth) => {
            if (!auth) {
                window.location.reload();
            } else {
                /* Remove below logs if you are using this on production */
                console.info("Authenticated");
                console.log('auth', auth)
                console.log('Keycloak', kc)
                console.log('Access Token', kc.token)
                console.log('parsed', kc.tokenParsed)
                setIsAuth(kc.authenticated)
                const {headers} = getHeaders(kc.token);

                /* http client will use this header in every request it sends */
                httpClient.defaults.headers.common['Authorization'] = `Bearer ${kc.token}`;
                fetchAllProducts(headers);

                kc.onTokenExpired = () => {
                    console.log('token expired')
                }
            }
        }, () => {
            /* Notify the user if necessary */
            console.error("Authentication Failed");
        });

    }, []);

    /* To demonstrate : http client adds the access token to the Authorization header */
    const callBackend = () => {
        httpClient.get('https://mockbin.com/request')

    };

    return (
        <div className="w-full h-full flex flex-col">
            {isAuth && <Nav
                isAuthenticated={kc.authenticated}
                logout={() => {
                    kc.logout({redirectUri: "http://localhost:3000"});
                }}
                login={() => {
                    kc.login();
                }}
            />}
            <Products products={products}/>


            {/* <div className='grid'>
                <div className='col-1'></div>
                <div className='col-2'>
                    <div className="col">
                        <Button onClick={() => { setInfoMessage(kc.authenticated ? 'Authenticated: TRUE -> ' + kc?.tokenParsed?.preferred_username : 'Authenticated: FALSE') }}
                                className="m-1 custom-btn-style"
                                label='Is Authenticated' />

                        <Button onClick={() => { kc.login() }}
                                className='m-1 custom-btn-style'
                                label='Login'
                                severity="success" />

                        <Button onClick={() => { setInfoMessage(kc.token) }}
                                className="m-1 custom-btn-style"
                                label='Show Access Token'
                                severity="info" />

                        <Button onClick={() => { setInfoMessage(JSON.stringify(kc.tokenParsed)) }}
                                className="m-1 custom-btn-style"
                                label='Show Parsed Access token'
                                severity="warning" />

                        <Button onClick={() => { setInfoMessage(kc.isTokenExpired(5).toString()) }}
                                className="m-1 custom-btn-style"
                                label='Check Token expired'
                                severity="info" />

                        <Button onClick={() => { kc.updateToken(10).then((refreshed) => { setInfoMessage('Token Refreshed: ' + refreshed.toString()) }, (e) => { setInfoMessage('Refresh Error') }) }}
                                className="m-1 custom-btn-style"
                                label='Update Token (if about to expire)' />  * 10 seconds

                        <Button onClick={callBackend}
                                className='m-1 custom-btn-style'
                                label='Send HTTP Request'
                                severity="success" />

                        <Button onClick={() => { kc.logout({redirectUri: "http://localhost:3000"}) }}
                                className="m-1 custom-btn-style"
                                label='Logout'
                                severity="danger" />

                        <Button onClick={() => { setInfoMessage(kc.hasRealmRole('admin').toString()) }}
                                className="m-1 custom-btn-style"
                                label='has realm role "Admin"'
                                severity="info" />

                        <Button onClick={() => { setInfoMessage(kc.hasResourceRole('test').toString()) }}
                                className="m-1 custom-btn-style"
                                label='has client role "test"'
                                severity="info" />

                    </div>
                </div>
                <div className='col-6'>
                    <Card>
                        <p style={{ wordBreak: 'break-all' }} id='infoPanel'>
                            {infoMessage}
                        </p>
                    </Card>
                </div>
                <div className='col-2'></div>
            </div>*/}



        </div>)
} ;

export default App;
