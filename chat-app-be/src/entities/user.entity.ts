import { Todo } from "src/entities/todo.entity";
import { Message } from "src/entities/message.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne,  } from "typeorm";
import { Socket } from "./socket.entity";

@Entity({ name: 'users', schema: 'public' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ nullable: true }) 
    refreshToken: string;

    @OneToOne(() => Socket, (socket) => socket.user)
    socket: Socket

    @OneToMany(() => Todo, (todo) => todo.user)
    todo: Todo[];

    @OneToMany(() => Message, message => message.sender)
    sentMessages: Message[];
  
    @OneToMany(() => Message, message => message.receiver)
    receivedMessages: Message[];
}
