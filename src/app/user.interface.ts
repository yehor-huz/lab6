export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  token: string;
}

export interface AuthResponse {
  user: User;
}