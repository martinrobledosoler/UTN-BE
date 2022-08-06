import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TechUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  techId: number;
}
