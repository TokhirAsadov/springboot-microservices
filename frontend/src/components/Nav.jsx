import React from "react";
import { kc } from "../Keycloak";
import {useNavigate} from "react-router-dom";

const Nav = ({ isAuthenticated, login, logout }) => {
    const navigate = useNavigate();
    return (
        <div className={'h-16 px-16 flex gap-4 justify-between items-center bg-blue-50'}>
            <button onClick={()=>{navigate("/")}} className={'font-bold text-blue-500 text-ls'}>MICROSERVICES</button>
            {
                isAuthenticated ? (
                    <div className={'flex flex-col gap-1'}>
                        <div className={'text-blue-600'}>Hi, {kc?.tokenParsed?.preferred_username}</div>
                        <hr/>
                        <button className={'font-bold text-gray-700 text-xs hover:text-blue-400'} onClick={() => logout()}>Logout</button>
                    </div>
                ) : (
                    <button onClick={() => login()}>Login</button>
                )
            }
        </div>
    );
};

export default Nav;
