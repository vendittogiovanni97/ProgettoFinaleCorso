import { LoginForm } from "../typesFetch/Login.Form.Type";
import { RegisterForm } from "../typesFetch/Register.Form.Type";
import { User } from "../components/UserLogged.type";

export type AuthContextType = {
  login: (data: LoginForm) => Promise<boolean>;
  register: (data: RegisterForm) => Promise<boolean>;
  isLogged: boolean;
  userLogged: User | null;
};
