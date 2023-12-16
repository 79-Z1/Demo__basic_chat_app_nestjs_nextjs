import { User } from "src/entities/user.entity";

export interface IMessage {
    content: string,
    timestamp: Date,
    sender: {
        id: User
    },
    receiver: {
        id: User
    }
}