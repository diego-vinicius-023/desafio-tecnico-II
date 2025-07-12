import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  imports: [TableModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('mobilemed-frontend');
  pacientes: any[] = [];

  constructor(private http: HttpClient) {
    this.loadTableData();
  }
 
  loadTableData() {
    this.http.get<any>('http://localhost:4000/Pacientes/?page=2&pageSize=2')
      .subscribe(response => {
        this.pacientes = response; // Adjust if your API returns { data: [...] }
      });
  }
}