import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exame } from '../../../entities/exame.entity';

@Injectable({
    providedIn: 'root'
})
export class CadastroExamesService {
    private baseUrl = 'http://localhost:4000/pacientes';

    constructor(private http: HttpClient) {}

    cadastrarExame(pacienteId: string, exame: any): Observable<any> {
        console.log(exame);
        const formattedDate = this.formatDate(exame.dataExame);
        
        const body = {
            "nomeExame": exame.nomeExame,
            "dataExame": formattedDate,
            "dicom": exame.modalidadeDicom.code
        };
        console.log(`${this.baseUrl}/${pacienteId}/Exames `,body);
        return this.http.post<any>(`${this.baseUrl}/${pacienteId}/Exames`, body);
        // return this.http.get<any>?page=${page}&pageSize=${pageSize}`);
    }
    formatDate(date: any) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}${month}${day}`;
    }
}