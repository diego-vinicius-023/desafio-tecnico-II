import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Breadcrumb } from 'primeng/breadcrumb';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, Breadcrumb],
  templateUrl: './header.component.html',
  styleUrls: ['../../../styles.css']
})
export class HeaderComponent {
  @Input() pages: { label: string, routerLink: string }[] = [];
}