import { Injectable } from "@nestjs/common";
import { Socket } from "src/entities/socket.entity";
import { DataSource, Repository } from "typeorm";
import { CreateOrUpdateSocketDto } from "./dto/create-or-update-socket.dto";
import { User } from "src/entities/user.entity";

@Injectable()
export class SocketRepository extends Repository<Socket> {
    constructor(private dataSource: DataSource) {
        super(Socket, dataSource.createEntityManager());
    }

    public async createOrUpdate(body: CreateOrUpdateSocketDto) {
        await this.upsert(body, ['user']);
    }

    public async getSocketId(userId: User) {
        const socket = await this
            .createQueryBuilder('socket')
            .innerJoinAndSelect('socket.user', 'user')
            .select('socket.socketId', 'socketId')
            .where('user.id = :userId', { userId })
            .getRawOne();
        return socket ? socket.socketId : null;
    }
}