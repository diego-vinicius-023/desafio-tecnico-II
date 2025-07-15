import { Injectable } from "@angular/core";
import { ExamesService } from "./exames.service";
import { Paciente } from "../../../entities/paciente.entity";
import { firstValueFrom } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ExamesController {
    constructor(private examesService: ExamesService) { }

    async obtemPacienteUnico(idPaciente: string): Promise<Paciente> {
        
        const paciente =  firstValueFrom(this.examesService.getPacienteUnico(idPaciente))
        return paciente;
    }

    async obtemExames(idPaciente: string, page: number, pageSize: number): Promise<any> {
        try {
            const response = await firstValueFrom(this.examesService.getExames(idPaciente, page, pageSize));
            return response;
        } catch (error) {
            console.error('Error loading pacientes:', error);
            throw error;
        }
    }

    async obtemNumExames(idPaciente: string): Promise<number>{
        try {
            const count = await firstValueFrom(this.examesService.getExamesCount(idPaciente));
            return count;
        } catch (error) {
            console.error('Error loading pacientes count:', error);
            throw error;
        }
    }
}