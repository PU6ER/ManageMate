export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  imageUrl: string;
}
export interface IUserData extends Omit<IUser, "id"> {}
