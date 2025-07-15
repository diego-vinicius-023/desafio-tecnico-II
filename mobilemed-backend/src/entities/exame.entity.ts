import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { DICOM } from './dicom.entity';

@Entity()
export class Exame {
  @PrimaryGeneratedColumn()
  IDExame: string;

  @Column()
  IDPaciente: string;

  @Column()
  NomeExame: string;

  @Column()
  DataExame: string;

  @Column()
  DICOM: DICOM;
}