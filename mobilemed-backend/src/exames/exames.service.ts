import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DICOM } from 'src/entities/dicom.entity';
import { Exame } from 'src/entities/exame.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ExamesService {
  constructor(
    @InjectRepository(Exame)
    private ExamesRepository: Repository<Exame>,
    private dataSource: DataSource
  ) {}

  async getExames(idPaciente: string, page: Number, pageSize: Number): Promise<any> {
    const result = await this.dataSource.query(
      `SELECT * FROM "MobileMed"."ObterExames"($1, $2, $3)`,
      [idPaciente, page, pageSize]
    );
    return result;
  }
  
  async getExamesNum(idPaciente: string): Promise<number> {
    const result = await this.dataSource.query(
      (
        'SELECT COUNT(*) ' +
        'FROM \"MobileMed\".\"Exames\" exames '+
        `WHERE exames.\"IDPaciente\" = \'${idPaciente}\';`
      )
    );
    return parseInt(result[0].count, 10);
  }

  async postExame(idPaciente: string, NomeExame: string, dataExame: Date, dicom: DICOM): Promise<any> {
    try {
      
      const result = await this.dataSource.query(
        `CALL "MobileMed"."InserirExame"($1, $2, $3, $4)`,
        [idPaciente, NomeExame, dataExame, dicom]
      );
      return { message: 'Exame salvo.',  status: HttpStatus.CREATED};

    } catch (error) {
      if (error.message){

        if (error.message.includes('duplicate key value violates unique constraint "Exames_pkey"')) 
          { throw new HttpException('Exame já existente.', HttpStatus.OK); }

        else if(error.message.includes('invalid input value for enum \"MobileMed\".\"Modalidade\"')) 
          { throw new HttpException('enum inválido.', HttpStatus.BAD_REQUEST); }
        
        else if(error.message.includes('insert or update on table "Exames" violates foreign key constraint "Exames_IDPaciente_fkey"'))
          { throw new HttpException('Paciente não encontrado.', HttpStatus.BAD_REQUEST)}
      }
      
      
      throw error;
    }
  }
}
