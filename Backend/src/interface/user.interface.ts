type UserRole = "ADMIN" | "CUSTOMER";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}
