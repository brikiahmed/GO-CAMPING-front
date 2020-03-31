export class UserModel {
  [x: string]: any; // todo : check whats this
  id: number;
  name: string;
  email: string;
  password: string;
  token?: string;
}
