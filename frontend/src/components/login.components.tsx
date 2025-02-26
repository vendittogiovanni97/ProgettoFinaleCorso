import { useContext, useState } from "react"
import { LoginForm } from "../types/Login.Form.Type";
import { AuthContext } from "../providers/Auth.Provider";

export function LoginComponents() {
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const {login} = useContext(AuthContext)

  const handleSubmit = async () => {
    const dataLogin: LoginForm = {
      email,
      password
    }
    const response = await login(dataLogin)
    if(response) {
      console.log('login succesfull')
    }
  }
  return (
    <div>
        <input onChange={(e)=> setEmail(e.target.value)}type="text" name="Email" placeholder="inserisci email"/>
        <input onChange={(e)=> setPassword(e.target.value)}type="text" name="password" placeholder="inserisci password"/>
        <button onClick={handleSubmit}>Login</button>
    </div>
  )
} 
