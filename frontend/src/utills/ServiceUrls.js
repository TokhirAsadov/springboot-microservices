export const TokenType="Bearer ";
export const TOKEN='YTIT_TOKEN';

export const getHeaders = () => {
  const token=localStorage.getItem(TOKEN)
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

export const BASE_URL = "/api/v1/desktop"  ;


export const AUTH = {
  LOGIN: "/auth/login",
  EMAIL: "/auth/email/"
};

