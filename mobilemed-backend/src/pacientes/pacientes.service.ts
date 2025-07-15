import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Paciente } from 'src/entities/paciente.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private PacientesRepository: Repository<Paciente>,
    private dataSource: DataSource
  ) {}

  async getPaciente(idPaciente: string): Promise<Paciente>{
    const result = await this.dataSource.query(
      `SELECT * FROM "MobileMed"."ObterPacienteUnico"($1)`,
      [idPaciente]
    );

    if (result.length === 0) {
      throw new HttpException('Paciente não encontrado.', HttpStatus.NOT_FOUND);
    }

    const dadosPaciente = result[0];

    const paciente = new Paciente();
    paciente.ID = dadosPaciente.ID;
    paciente.nomeCompleto = dadosPaciente.NomeCompleto;
    paciente.CPF = dadosPaciente.CPF; 
    
    return paciente;
  }

  async getPacientes(page: Number, pageSize: Number): Promise<any> {
    const result = await this.dataSource.query(
      `SELECT * FROM "MobileMed"."ObterPacientes"($1, $2)`,
      [page, pageSize]
    );
    return result;
  }

  async getPacientesNum(): Promise<any> {
    const result = await this.dataSource.query(
      'SELECT COUNT(*) FROM \"MobileMed\".\"Pacientes\"'
    );
    return parseInt(result[0].count, 10);
  }

  async postPaciente(nomeCompleto: string, cpf: string): Promise<any> {
    try {
      const result = await this.dataSource.query(
        `CALL "MobileMed"."InserirPaciente"($1, $2)`,
        [nomeCompleto, cpf]
      );
      return { message: 'Paciente Criado.', status: HttpStatus.CREATED };
    } catch (error) {
      if (error.message){
        if (error.message.includes('duplicate key value violates unique constraint "Pacientes_pkey"')) 
          { throw new HttpException('Duplicidade.', HttpStatus.CONFLICT); }
      }
      
      throw error;
    }
  }
}
