import {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {httpClient} from "./HttpClient";
import {kc} from "./Keycloak";
import Nav from "./components/Nav";
import axios from "axios";
import {BASE_URL, getHeaders, PRODUCT} from "./utills/ServiceUrls";
import Products from "./components/Products";
import AddProductPage from "./pages/AddProductPage";



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
            {kc.authenticated && <Nav
                isAuthenticated={kc.authenticated}
                logout={() => {
                    kc.logout({redirectUri: "http://localhost:3000"});
                }}
                login={() => {
                    kc.login();
                }}
            />}
            <Router>
                <Routes>
                    <Route exact path="/" element={<Products products={products}/>}/>
                    <Route exact path="/add-product" element={<AddProductPage />}/>
                </Routes>
            </Router>
        </div>
        )
} ;

export default App;
