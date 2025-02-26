/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, PropsWithChildren, useState } from "react";
import { LoginForm } from "../types/Login.Form.Type";
import { RegisterForm } from "../types/Register.Form.Type";
import { serverConfig } from "../config/fetchUrl";
import { AuthContextType } from "../types/Auth.Context.type";

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
    const response = await fetch(
      `${serverConfig.basePath}${serverConfig.basePort}${serverConfig.baseRest}/account/login`,
      {
        method: "POST",
        body: JSON.stringify({
          email: data.email,
          password: data.password
        }),
        credentials: 'include',
        headers: {'content-type':'application/json'} 
      }
    );

    const res = await response.json();
    if (res.status === 200) {
      setIsLogged(true);
      setUserLogged(res.data);
      return true; 
    }else {
      return false
    }
  };

  const register = async (data: RegisterForm) => {
    const response = await fetch(
      `${serverConfig.basePath}${serverConfig.basePort}${serverConfig.baseRest}/account/register`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const res = await response.json();
    if (res.status === 200) {
      return  true;
    } else {
      return false;
    }
  };
  return (
    <AuthContext.Provider value={{ isLogged, userLogged, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};
