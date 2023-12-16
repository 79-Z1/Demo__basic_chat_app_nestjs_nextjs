import { User } from "src/entities/user.entity";

export class CreateOrUpdateSocketDto {
    socketId: string;
    user: User;
}
