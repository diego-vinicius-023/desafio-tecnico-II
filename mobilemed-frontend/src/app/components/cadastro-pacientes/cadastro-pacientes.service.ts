import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../../../entities/paciente.entity';

@Injectable({
    providedIn: 'root'
})
export class CadastroPacientesService {
    private apiUrl = 'http://localhost:4000/pacientes';

    constructor(private http: HttpClient) {}

    cadastrarPaciente(paciente: Paciente): Observable<any> {
        const body: Paciente = paciente
        return this.http.post<any>(this.apiUrl, body);
    }
}