import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DICOM } from '../../../entities/dicom.entity';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { CadastroExamesController } from './cadastro-exames.controller';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-cadastro-exames',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule, 
        FormsModule, 
        InputMaskModule, 
        ButtonModule, 
        InputTextModule, 
        MessageModule, 
        ToastModule, 
        DatePickerModule, 
        SelectModule,
        ProgressSpinnerModule
    ],
    providers: [MessageService],
    templateUrl: './cadastro-exames.component.html'
})
export class CadastroExamesComponent implements OnInit {
    @Input() pacienteId: string = '';
    @Output() reloadData = new EventEmitter<any>();
    exameForm: FormGroup;
    dicom: { name: string; code: string }[] = [];
    loading: boolean = false;
    networkError: string | null = null;

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private cadastroExamesController: CadastroExamesController,
    ) {
        
        this.exameForm = this.fb.group({
            nomeExame: ['', Validators.required],
            dataExame: ['', Validators.required],
            modalidadeDicom: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.dicom = Object.keys(DICOM)
            .filter((key) => isNaN(Number(key)))
            .map((key) => ({
                name: key,
                code: DICOM[key as keyof typeof DICOM],
            }));
    }

    criarExame() {
        try{
            if (this.exameForm.valid) {
                this.loading = true;
                this.networkError = null; // Reset network error
                this.cadastroExamesController.cadastrarExame(this.pacienteId ,this.exameForm.value)
                    .then((result) => {
                        console.log(result.statusCode);
                        if (result.status == 201){
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: result.message || 'Exame criado com sucesso!'
                            });
                            this.reloadData.emit();
                        }
                        else{
                            this.messageService.add({
                                severity: 'warn',
                                summary: 'Aviso',
                                detail: result.message || 'Exame já existente.'
                            });
                        }
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
        this.criarExame(); // Retry the operation
    }
}