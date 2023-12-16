import { User } from 'src/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity({ name: 'messages', schema: 'public' })
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.sentMessages)
  sender: User;

  @ManyToOne(() => User, user => user.receivedMessages)
  receiver: User;

  @Column()
  content: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
