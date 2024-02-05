import { BASE_URL, TOKEN_URL } from "./constants";
import { TResponseOrderFeed } from "./types";

export const setTokens = (refreshToken: string, accessToken: string) => {
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessToken", accessToken);
  }
  
  export const checkReponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
  };
  
  export const refreshToken = () => {
    return fetch(`${BASE_URL}${TOKEN_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    }).then(checkReponse);
  };

  export const isValidOrder = (x: any): x is TResponseOrderFeed => x !== undefined && x !== null && Array.isArray(x.orders) && x.orders.length > 0;
