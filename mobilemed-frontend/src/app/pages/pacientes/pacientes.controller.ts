import { Injectable } from '@angular/core';
import { PacientesService } from './pacientes.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PacientesController {
    constructor(private pacientesService: PacientesService) {}

    async obtemPacientes(page: number, pageSize: number): Promise<any> {
        try {
            const response = await firstValueFrom(this.pacientesService.getPacientes(page, pageSize));
            return response;
        } catch (error) {
            console.error('Error loading pacientes:', error);
            throw error;
        }
    }

    async obtemNumPacientes(): Promise<number> {
        try {
            const count = await firstValueFrom(this.pacientesService.getPacientesCount());
            return count;
        } catch (error) {
            console.error('Error loading pacientes count:', error);
            throw error;
        }
    }
}