import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Technologies {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
