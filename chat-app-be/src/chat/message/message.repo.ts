import { BadRequestException, Injectable } from "@nestjs/common";
import { Message } from "src/entities/message.entity";
import { DataSource, Repository } from "typeorm";
import { CreateMessageDto } from "./dto/create-message.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MessageRepository extends Repository<Message> {
    constructor(
        @InjectRepository(Message)
        private message: Repository<Message>,
        private dataSource: DataSource
    ) {
        super(Message, dataSource.createEntityManager());
    }


    async createMessage(createMessageDTO: CreateMessageDto) {
        try {
            const newMessage = this.message.create(createMessageDTO);
            await this.message.save(newMessage);
            return this.getMessages();
        } catch (error) {
            throw new BadRequestException('create message err')
        }
    }

    async getMessages() {
        const messageRepository = this.dataSource.getRepository(Message);
        const messages = await messageRepository
            .createQueryBuilder('message')
            .leftJoin('message.sender', 'sender')
            .leftJoin('message.receiver', 'receiver')
            .addSelect('sender.id')
            .addSelect('receiver.id')
            .getMany();

        return messages;
    }
}