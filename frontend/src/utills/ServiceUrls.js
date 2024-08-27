export const TokenType="Bearer ";
export const TOKEN='YTIT_TOKEN';

export const getHeaders = (token) => {
  const headers={
    'Authorization':TokenType+token,
    'Access-Control-Allow-Origin': '*'
  }
  return {headers};
}

export const getToken = () => {
  const token=localStorage.getItem(TOKEN);
  return { token }
}

export const BASE_URL = "http://localhost:9000/api";
// export const BASE_URL = "/api";


export const PRODUCT = {
  GET_ALL: "/product",
  DELETE: "/product/",
  EMAIL: "/auth/email/"
};

