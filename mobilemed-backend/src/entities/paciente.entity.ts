import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  NomeCompleto: string;

  @Column()
  CPF: string;
}