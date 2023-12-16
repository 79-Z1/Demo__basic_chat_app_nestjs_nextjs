import { Injectable } from '@nestjs/common';
import { CreateOrUpdateSocketDto } from './dto/create-or-update-socket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SocketRepository } from './socket.repository';
import { User } from 'src/entities/user.entity';

@Injectable()
export class SocketService {
  constructor(
    @InjectRepository(SocketRepository)
    private socketRepo: SocketRepository,
  ) { }
 
  async createOrUpdate(createOrUpdate: CreateOrUpdateSocketDto) {
    return await this.socketRepo.createOrUpdate(createOrUpdate);
  }

  async findSocketId(userId: User) {
    return await this.socketRepo.getSocketId(userId)
  }
}
