import { UserLogin } from "./user-login";

export interface UserRegister extends UserLogin {
  passwordConfirm: string;
}