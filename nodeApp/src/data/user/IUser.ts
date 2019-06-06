import { UserType } from "./userType";

export interface IUser {
    userType: UserType;
    roomCode: string;
    name: string;
    ip: string;
}
