import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tabela',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './tabela.component.html',
  styleUrls: ['../../../styles.css']
})
export class TabelaComponent {
  @Input() columns: any[] = [];
  @Input() value: any[] = [];
  @Input() pageSize: number = 5;
  @Input() totalRecords: number = 0;
  @Output() lazyLoad = new EventEmitter<any>();
  @Output() cellClick = new EventEmitter<{rowData: any, column: any}>();

  loadTableData(event: any) {
    this.lazyLoad.emit(event);
  }

  onCellClick(rowData: any, column: any) {
    this.cellClick.emit({rowData, column});
  }
}