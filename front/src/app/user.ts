export interface User{
  id: number;
  username: string;
  jwt: string;
  expiresIn: number;
  role: string;
}