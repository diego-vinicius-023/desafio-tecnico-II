import { Controller, Get, Query } from '@nestjs/common';
import { PacientesService } from './pacientes.service';

@Controller('pacientes')
export class PacientesController {
  constructor(private readonly pacientesService: PacientesService) {}

  @Get('Pacientes')
  async getPacientes (
      @Query('page') page: number,
      @Query('pageSize') pageSize: number,
    ) {
      return this.pacientesService.getPacientes(Number(page), Number(pageSize));
  }

  @Get()
  getHello(): string {
    return this.pacientesService.getHello();
  }
}
