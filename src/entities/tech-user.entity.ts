import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TechUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  useremail: string;

  @Column()
  technology: string;
}
