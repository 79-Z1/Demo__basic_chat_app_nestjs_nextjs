import { Injectable, CanActivate } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Injectable()
export class WsGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
    ) { }

    async canActivate(context: ExecutionContextHost): Promise<boolean> {
        const client: Socket = context.switchToWs().getClient<Socket>();
        const authToken: any = client.handshake?.headers['authorization'];
        const [, token] = authToken?.split(' ') ?? [];
        try {
            const decodedUser = await this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_ACCESS_SECRET,
                ignoreExpiration: true
            });
            // context.switchToWs().getData().user = decodedUser;
            client['userId'] = decodedUser['sub']

            return  Boolean(decodedUser);
        } catch (ex) {
            throw new WsException(ex.message);
        }
    }
}