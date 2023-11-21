import { UserLogin } from "./dto/user-login";
import { UserRegister } from "./dto/user-register";
import { User } from "./interfaces/user";
import { UserService } from "./user-service";

export class AuthService {
  private baseUrl: string;
  private userService: UserService;

  constructor() {
    this.baseUrl = "http://localhost:3000"; // Ajusta la URL según tu configuración.
    this.baseUrl += "/auth";
    this.userService = new UserService();
  }

  async login(credentials: UserLogin) {
    try {
      const users: [User] | undefined =
        await this.userService.getUserByCredentials(credentials);
      const user: User | undefined = users?.[0];
      if (user) {
        if (
          user.email === credentials.email &&
          user.password === credentials.password
        ) {
          return user;
        }
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      throw error;
    }
  }

  async register(userRegister: UserRegister) {
    try {
      if (userRegister.password === userRegister.passwordConfirm) {
        const credentials: UserLogin = {
          email: userRegister.email,
          password: userRegister.password,
        };
        const users: [User] | undefined = await this.userService.getUserByEmail(
          credentials.email
        );
        console.log(users);
        const user: User | undefined = users?.[0];
        if (!user) {
          const newUser: User = {
            username: userRegister.email,
            email: userRegister.email,
            password: userRegister.password,
          };
          const newUserCreated: User = await this.userService.createUser(
            newUser
          );
          return await this.userService.createUser(newUserCreated);
        }
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  }
}
