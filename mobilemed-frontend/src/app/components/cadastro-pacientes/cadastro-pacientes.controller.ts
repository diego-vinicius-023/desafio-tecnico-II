import { Injectable } from '@angular/core';
import { CadastroPacientesService } from './cadastro-pacientes.service';
import { Paciente } from '../../../entities/paciente.entity';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CadastroPacientesController {
    constructor(private cadastroPacientesService: CadastroPacientesService) {}

    cadastrarPaciente(pacienteData: any): Promise<any> {
        
        const paciente: Paciente = {
            ID: null,
            nomeCompleto: pacienteData.nomeCompleto,
            cpf: pacienteData.cpf
        };
        
        return firstValueFrom(this.cadastroPacientesService.cadastrarPaciente(paciente));
    }
}