import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Paciente } from "../../../entities/paciente.entity";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ExamesService{
    private baseUrl = 'http://localhost:4000/pacientes';
    constructor (private http: HttpClient) {}

    getPacienteUnico(idPaciente: string){
        return this.http.get<Paciente>(`${this.baseUrl}/${idPaciente}`);
    }

    getExames(idPaciente: string, page: number, pageSize: number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/${idPaciente}/Exames?page=${page}&pageSize=${pageSize}`);
    }

    getExamesCount(idPaciente: string): Observable<number> {
        return this.http.get<number>(`${this.baseUrl}/${idPaciente}/Exames/count`);
    }
}