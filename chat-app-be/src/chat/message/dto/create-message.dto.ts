import { User } from "src/entities/user.entity";

export class CreateMessageDto {
  sender: User;
  receiver: User;
  content: string;
}
