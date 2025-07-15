import { Controller, Get, Post, Query, Body, Param } from '@nestjs/common';
import { ExamesService } from './exames.service';
import { DICOM } from 'src/entities/dicom.entity';

@Controller('pacientes/:idPaciente/exames')
export class ExamesController {
  constructor(private readonly pacientesService: ExamesService) {}

  @Get()
  async getExames(
    @Param('idPaciente') idPaciente: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.pacientesService.getExames(idPaciente, Number(page), Number(pageSize));
  }

  @Get('count')
  async getExamesNum(
    @Param('idPaciente') idPaciente: string
  ){
    return this.pacientesService.getExamesNum(idPaciente);
  }

  @Post()
  async postExames (
    @Param('idPaciente') idPaciente: string,
    @Body() body: { nomeExame: string; dataExame: Date; dicom: DICOM }
  ) {
    return this.pacientesService.postExame(idPaciente, body.nomeExame, body.dataExame, body.dicom);
  }

}