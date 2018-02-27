import {IUser} from './IUser';

export class User implements IUser {

  constructor(
    public id?: string,
    public email?: string,
    public password?: string,
    public confirmPassword?: string
  ) { }
}
