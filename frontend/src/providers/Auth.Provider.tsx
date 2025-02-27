/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, PropsWithChildren, useState } from "react";
import { LoginForm } from "../types/Login.Form.Type";
import { RegisterForm } from "../types/Register.Form.Type";
import { serverConfig } from "../config/fetchUrl";
import { AuthContextType } from "../types/Auth.Context.type";
import { backendFetch } from "../rest/backendFetch";


export const AuthContext = createContext<AuthContextType>({
  login: async (data: LoginForm) => false,
  register: async (data: RegisterForm) => false,
  isLogged: false,
  userLogged: null,
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLogged, setIsLogged] = useState(false);
  const [userLogged, setUserLogged] = useState(null);

  const login = async (data: LoginForm) => {
    console.log('data', data)
    const { responseBody } = await backendFetch(
      "/account/login",
      "post",
      data
    );

    const res = await responseBody.json();
    if (res.status === 200) {
      setIsLogged(true);
      setUserLogged(res.data);
      return true; 
    }else {
      return false
    }
  };

  const register = async (data: RegisterForm) => {
    try {
      const { fetchResult, responseBody } = await backendFetch(
        "/account/register",
        "post",
        data
      );

      if (responseBody.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      return false;
    }
  };
  return (
    <AuthContext.Provider value={{ isLogged, userLogged, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
