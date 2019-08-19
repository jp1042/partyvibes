import { UserType } from "./userType";

export interface IUser {
    userType: UserType;
    roomCode: string;
    username: string;
    ip: string;
}
