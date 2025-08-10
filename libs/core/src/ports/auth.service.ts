import { CreateUser, LoginUser, User } from '@realworld/dto';

export abstract class AuthService {
  abstract authenticate(email: LoginUser['email'], passport: LoginUser['password']): Promise<User>;

  abstract authorize(user: CreateUser): Promise<string>;
}
