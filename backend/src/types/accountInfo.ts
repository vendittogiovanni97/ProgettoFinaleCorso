export type LoginInfo = {
  email: string;
  password: string;
};

export type RegisterInfo = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate?: string;
  username: string;
};

export type PasswordInfo = {
  password: string;
};
