import { Component } from "@angular/core";
import { ExamesController } from "./exames.controller";
import { HeaderComponent } from "../../shared/header/header.component";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Paciente } from "../../../entities/paciente.entity";
import { Exame } from "../../../entities/exame.entity";
import { TabelaComponent } from "../../shared/tabela/tabela.component";
import { PrimeNG } from "primeng/config";
import { CommonModule } from "@angular/common";
import { ButtonModule } from "primeng/button";
import { CadastroExamesComponent } from "../../components/cadastro-exames/cadastro-exames.component";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { ProgressSpinnerModule } from "primeng/progressspinner";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        CommonModule, 
        HeaderComponent, 
        ButtonModule, 
        TabelaComponent,
        CadastroExamesComponent, 
        ToastModule,
        ProgressSpinnerModule
    ],
    providers: [MessageService],
    templateUrl: './exames.component.html',
    styleUrl: '../../../styles.css'
})
export class ExamesComponent{
    pages: any[] = [];
    pacienteId: string = '';
    paciente: Paciente | null = null;
    exames: Exame[] = [];
    cols: any[] = [];
    showCadastro: boolean = false;
    page: number = 1;
    pageSize: number = 5;
    numExames: number = 0;
    loading: boolean = false;

    constructor(
        private examesController: ExamesController,
        private primeng: PrimeNG, 
        private route: ActivatedRoute,
        private messageService: MessageService
    ){}

    async ngOnInit(){
        try{
            this.loading = true;
            this.route.params.subscribe(params => {
                this.pacienteId = params['id'];
                
            });
            this.paciente = await this.examesController.obtemPacienteUnico(this.pacienteId);
            console.log(this.paciente)
            this.pages = [
                    { label: 'Pacientes', routerLink: '/Pacientes' },
                    { label: `${this.paciente.nomeCompleto}`, routerLink: `/Pacientes/${this.pacienteId}`}
                ];
            this.primeng.ripple.set(true);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Erro desconhecido';
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: errorMessage,
            });
        } finally{
            this.loading = false;
        }
    }

    async obtemExamesPaciente(idPaciente: string) {
        try {
            this.loading = true;
            this.exames = await this.examesController.obtemExames(this.pacienteId, this.page, this.pageSize);

            
            this.exames = this.exames.map((exame) => ({
                ...exame,
                DataExame: exame.DataExame
                    ? this.formatDate(new Date(exame.DataExame)) // Format if not null
                    : 'Data inválida', // Handle null case
            }));

            console.log('Exames: ', this.exames);

            // Generate columns dynamically, excluding IDPaciente
            this.cols = Object.keys(this.exames[0])
                .filter((key) => key !== 'IDPaciente') // Exclude IDPaciente
                .map((key) => ({
                    field: key,
                    header: key,
                }));
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Erro desconhecido';
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: errorMessage,
            });
        } finally{
            this.loading = false;
        }
    }

    
    private formatDate(date: Date): string {
        const day = String(date.getDate()+1).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    async onLazyLoad(event: any) {
        try{
            this.page = ((event.first/event.rows)+1);
            this.pageSize = event.rows;
            
            await this.obtemNumExames();
            if (this.numExames > 0){
                await this.obtemExamesPaciente(this.pacienteId);
            }
            else {
                this.cols = [
                    {field:'IDExame', header:'IDExame'}, 
                    {field:'NomeExame', header:'NomeExame'}, 
                    {field:'DataExame', header:'DataExame'}, 
                    {field:'DICOM', header:'DICOM'}
                ]
                this.messageService.add({
                        severity: 'warn',
                        summary: 'Aviso',
                        detail: 'Paciente sem exames cadastrados.'
                    });
            }
            
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Erro desconhecido';
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: errorMessage,
            });
        }
        
    }

    finishForm(){
        this.showCadastro = false;
        this.reloadData();
    }

    reloadData(){    

        this.obtemNumExames();
        this.obtemExamesPaciente(this.pacienteId);
        
    }

    async obtemNumExames(){
        try {
            this.loading = true;
            this.numExames = await this.examesController.obtemNumExames(this.pacienteId);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'Erro desconhecido';
            this.messageService.add({
                severity: 'error',
                summary: 'Erro',
                detail: errorMessage,
            });
        } finally{
            this.loading = false;
        }
    }
}