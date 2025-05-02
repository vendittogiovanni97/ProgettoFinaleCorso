import handleResponse from "./utils";
interface AuthResponse {
  token?: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
  message: string;
}
const authService = {
  register: async (userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await fetch("/api/account/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> => {
    const response = await fetch("/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  resetPassword: async (email: string): Promise<AuthResponse> => {
    const response = await fetch("/api/account/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    return handleResponse(response);
  },

  logout: async (): Promise<AuthResponse> => {
    const response = await fetch("/api/account/logout", {
      method: "POST",
    });
    return handleResponse(response);
  },
};

export default authService;