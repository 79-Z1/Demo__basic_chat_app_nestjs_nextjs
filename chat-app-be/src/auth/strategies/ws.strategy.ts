import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Socket } from 'socket.io';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class WsAuthStrategy extends PassportStrategy(Strategy, 'wsjwt') {
  constructor() {
    super({
      jwtFromClient: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_ACCESS_SECRET
    });
  }

  validate(client: Socket, payload: JwtPayload) {
    client['user'] = payload;
    return payload;
  }
}

