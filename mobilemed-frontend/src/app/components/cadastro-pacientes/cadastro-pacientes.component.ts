import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CadastroPacientesController } from './cadastro-pacientes.controller';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-cadastro-pacientes',
    standalone: true,
    imports: [
        CommonModule, 
        ReactiveFormsModule, 
        InputMaskModule, 
        ButtonModule, 
        InputTextModule, 
        MessageModule, 
        ToastModule,
        ProgressSpinnerModule
        ],
    providers: [MessageService],
    templateUrl: './cadastro-pacientes.component.html'
})
export class CadastroPacientesComponent {
    @Output() reloadData = new EventEmitter<any>();
    pacienteForm: FormGroup;
    loading: boolean = false;
    networkError: string | null = null;

    constructor(
        private fb: FormBuilder,
        private cadastroPacientesController: CadastroPacientesController,
        private messageService: MessageService
    ) {
        this.pacienteForm = this.fb.group({
            nomeCompleto: ['', Validators.required],
            cpf: ['', Validators.required],
        });
    }

    criarPaciente() {
        try {
            if (this.pacienteForm.valid) {
                this.loading = true;
                this.networkError = null; // Reset network error
                this.cadastroPacientesController
                    .cadastrarPaciente(this.pacienteForm.value)
                    .then((result) => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: result.message || 'Paciente criado com sucesso!',
                        });
                        this.reloadData.emit();
                    })
                    .catch((error) => {
                        this.networkError = error.error?.message || error.message || 'Erro de rede. Tente novamente.';
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        } catch (error) {
            this.networkError = 'Erro desconhecido. Tente novamente.';
        }
    }

    retry() {
        this.criarPaciente(); // Retry the operation
    }
}