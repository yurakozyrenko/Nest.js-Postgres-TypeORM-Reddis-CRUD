import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from '../articles/article.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({})
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
