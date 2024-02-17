import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Article {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Article title' })
  @Column()
  title: string;

  @ApiProperty({ example: 'Article description' })
  @Column()
  description: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    example: {
      id: 8,
      email: '1@1.ru',
      password: '$2b$10$zDu/cPetdGS//mhA0elGb.TXrF6n9SkadJaJjeQN1OFW3DqsFyaqK',
      name: 'Igor',
    },
  })
  @ManyToOne(() => User, (user) => user.articles)
  author: User;
}
