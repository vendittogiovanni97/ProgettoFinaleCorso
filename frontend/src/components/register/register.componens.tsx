/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormEventHandler, useContext, useState } from "react";
import { AuthContext } from "../../providers/Auth.Provider";
import { Link } from "react-router-dom";
import './register.css'

export function RegisterComponents() {
  const { register } = useContext(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const registerData = {
      name: formData.get("name") as string,
      lastname: formData.get("lastname") as string,
      username: formData.get("username") as string,
      birthdate: formData.get("birthdate") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    try {
      const responseBody = await register(registerData);
      if (responseBody) {
        setSuccess(true);
        // TODO: aggiungere messaggio per il client reg successfull
      } else {
        setError("Si è verificato un errore durante la registrazione.");
      }
    } catch (err) {
      setError("Si è verificato un errore durante la registrazione.");
      console.error(err);
    }
  }

    return (
      <div className="register-container">
        <h2>Registrazione</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div>
            <label htmlFor="lastname">Cognome:</label>
            <input type="text" id="lastname" name="lastname" required />
          </div>

          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>

          <div>
            <label htmlFor="birthdate">Data di nascita:</label>
            <input type="date" id="birthdate" name="birthdate" required />
          </div>

          <div>
            <button type="submit">Registrati</button>
          </div>
        </form>

        <div>
          <p>
            Sei già registrato? <Link to="/login">Accedi</Link>
          </p>
        </div>
      </div>
    );
}
