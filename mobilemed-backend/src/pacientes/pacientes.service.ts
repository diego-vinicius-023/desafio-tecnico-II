import { Injectable } from '@nestjs/common';

@Injectable()
export class PacientesService {
  getHello(): string {
    return 'Pacientes';
  }

  getPacientes(page: Number, pageSize: Number): string {
    return 'Pacientes';
  }
}
