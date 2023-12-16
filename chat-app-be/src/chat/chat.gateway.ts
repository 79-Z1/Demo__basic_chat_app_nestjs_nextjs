import { Logger, UseGuards } from '@nestjs/common';
import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket/socket.service';
import { JwtService } from '@nestjs/jwt';
import { WsGuard } from './guard/validate.guard';
import { IMessage } from 'src/common/types/index.type';
import { MessageService } from './message/message.service';
import { CreateMessageDto } from './message/dto/create-message.dto';


@UseGuards(WsGuard) 
@WebSocketGateway(3006, {
    cors: {
        origin: '*',
    },
})
export class ChatGateway {
    constructor(
        private readonly socketService: SocketService,
        private readonly messageSV: MessageService,
        private jwtService: JwtService,
    ) { }
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('MessageGateway');

    afterInit() {
        this.logger.log("🚀🚀🚀 Socket server init");
    }

    @UseGuards(WsGuard)
    async handleConnection(client: Socket) {
        this.logger.log(`Client id: ${client['id']} Connected`);
        const user = await this.getDataUserFromToken(client);
        await this.socketService.createOrUpdate({
            socketId: client['id'],
            user: user['sub']
        })
    }

    async handleDisconnect(client: Socket) {
        this.logger.log(`Client id: ${client['id']} Disconnected`);
    }

    @SubscribeMessage('send-message')
    async handleSendMessages(client: Socket, payload: IMessage) {
        const friendSocketId:string = await this.socketService.findSocketId(payload.receiver.id);
        const newMessage:CreateMessageDto = {
            sender: payload.sender.id,
            receiver: payload.receiver.id,
            content: payload.content,
        }
        await this.messageSV.create(newMessage)
        const messages = await this.messageSV.findAll();
        this.server.sockets.to(friendSocketId).emit('receive-message', messages);
    }
    
    @SubscribeMessage('get-conversation-messages')
    async handleGetConversationMessage(client: Socket) {
        const messages = await this.messageSV.findAll();
        this.server.sockets.to(client['id']).emit('conversation-messages', messages);
    }

    async getDataUserFromToken(client: Socket) {
        const authToken: any = client.handshake?.headers['authorization']; 
        const [, token] = authToken?.split(' ') ?? [];
        if(!token) throw new WsException('Forbiddent')

        try {
            const decodedUser = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_SECRET,
                ignoreExpiration: true
            });

            return decodedUser;
        } catch (ex) {
            console.log(ex.message);
        }
    }
}