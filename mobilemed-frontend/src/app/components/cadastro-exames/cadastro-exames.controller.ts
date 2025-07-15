import { Injectable } from '@angular/core';
import { CadastroExamesService } from './cadastro-exames.service';
import { Exame } from '../../../entities/exame.entity';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CadastroExamesController {
    constructor(private cadastroExamesService: CadastroExamesService) {}

    cadastrarExame(pacienteId: string,exameData: any): Promise<any> {
        return firstValueFrom(this.cadastroExamesService.cadastrarExame(pacienteId, exameData));
    }
}