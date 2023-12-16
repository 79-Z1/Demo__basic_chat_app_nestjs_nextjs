import { User } from "src/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sockets', schema: 'public' })
export class Socket {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    socketId: string;

    @OneToOne(() => User,  (user: User) => user.socket)
    @JoinColumn()
    user: User;
}
