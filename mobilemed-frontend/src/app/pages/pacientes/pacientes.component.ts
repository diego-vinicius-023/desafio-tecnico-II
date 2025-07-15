import { Component, signal } from '@angular/core';
import { TabelaComponent } from '../../shared/tabela/tabela.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CadastroPacientesComponent } from '../../components/cadastro-pacientes/cadastro-pacientes.component';
import { CommonModule } from '@angular/common';
import { PrimeNG } from 'primeng/config';
import { PacientesController } from './pacientes.controller';
import { Paciente } from '../../../entities/paciente.entity';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    TabelaComponent, 
    HeaderComponent,  
    ButtonModule, 
    CadastroPacientesComponent,
    ProgressSpinnerModule
  ],
  providers: [MessageService],
  templateUrl: './pacientes.component.html',
  styleUrl: '../../../styles.css'
})
export class PacientesComponent {
  protected readonly title = signal('mobilemed-frontend');
  pacientes: Paciente[] = [];
  cols: any[] = [];
  pages = [{ label: 'Pacientes', routerLink: '/Pacientes' }];
  showCadastro: boolean = false;
  page: number = 1;
  pageSize: number = 5;
  numPacientes: number = 0;
  loading: boolean = false;

  constructor(
    private pacientesController: PacientesController,
    private primeng: PrimeNG, 
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(){
    this.reloadData();
    this.primeng.ripple.set(true);
  }

  onLazyLoad(event: any) {
    this.page = ((event.first/event.rows)+1);
    this.pageSize = event.rows;
    
    this.reloadData();
  }

  onCellClick(event: any) {
    console.log(event.rowData.ID);
    this.router.navigate([`/Pacientes`,event.rowData.ID])
  }

  finishForm(){
    this.showCadastro = false;
    this.reloadData();
  }

  async reloadData(){    
    await this.obtemNumPacientes();
    if (this.numPacientes > 0){
      this.obtemPacientes();
    } else{
      this.cols = [
          {field:'ID', header:'ID'}, 
          {field:'NomeCompleto', header:'Nome Completo'}, 
          {field:'CPF', header:'CPF'}
      ]
      this.messageService.add({
              severity: 'warn',
              summary: 'Aviso',
              detail: 'Sem pacientes cadastrados.'
          });
    }
  }

  async obtemNumPacientes(){
    try {
      this.loading = true;
      this.numPacientes = await this.pacientesController.obtemNumPacientes();
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

  async obtemPacientes() {
    this.loading = true;
    this.pacientes = await this.pacientesController.obtemPacientes(this.page, this.pageSize);

    if (this.pacientes.length > 0) {

      this.cols = Object.keys(this.pacientes[0]).map(key => ({
        field: key,
        header: key,
        clickable: key === 'ID'
      }));

    }
    this.loading = false;
  }
}