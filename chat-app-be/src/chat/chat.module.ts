import { Module } from '@nestjs/common';
import { MessageService } from './message/message.service';
import { SocketService } from './socket/socket.service';
import { ChatGateway } from './chat.gateway';
import { SocketRepository } from './socket/socket.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { Socket } from 'src/entities/socket.entity';
import { Message } from 'src/entities/message.entity';
import { MessageRepository } from './message/message.repo';
 
@Module({
    imports: [TypeOrmModule.forFeature([Socket, Message]), JwtModule.register({})],
    providers: [
        MessageService, SocketService, ChatGateway, SocketRepository, MessageRepository
    ]
})
export class ChatModule {}
