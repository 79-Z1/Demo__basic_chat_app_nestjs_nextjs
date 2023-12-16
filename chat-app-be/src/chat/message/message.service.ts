import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessageRepository } from './message.repo';

@Injectable()
export class MessageService {
  constructor(
    private messageRepo: MessageRepository,
  ) { }
  
  async create(createMessageDto: CreateMessageDto) {
    return await this.messageRepo.createMessage(createMessageDto)
  }

  async findAll() {
    return await this.messageRepo.getMessages()
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
