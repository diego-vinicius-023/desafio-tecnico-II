import { Controller, Get, Post, Query, Body, Param } from '@nestjs/common';
import { PacientesService } from './pacientes.service';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  
 
  @Get()
  async getPacientes (
      @Query('page') page: number,
      @Query('pageSize') pageSize: number,
    ) {
      return this.pacientesService.getPacientes(Number(page), Number(pageSize));
  }  

  @Get('count')
  async getPacientesNum(){
    return this.pacientesService.getPacientesNum();
  }

  @Get(':idPaciente')
  async getPaciente(
    @Param('idPaciente') idPaciente: string
  ){
    return this.pacientesService.getPaciente(idPaciente)
  }

  @Post()
  async postPacientes (@Body() body: { nomeCompleto: string; cpf: string }) {
    return this.pacientesService.postPaciente(body.nomeCompleto, body.cpf);
  }

}