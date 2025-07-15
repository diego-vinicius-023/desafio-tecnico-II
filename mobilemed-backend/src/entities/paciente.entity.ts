import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Paciente {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  nomeCompleto: string;

  @Column()
  CPF: string;
}