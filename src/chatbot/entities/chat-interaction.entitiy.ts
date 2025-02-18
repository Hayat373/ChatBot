import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chat_interactions')
export class ChatInteraction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @Column()
  response: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  userId: number; 
}