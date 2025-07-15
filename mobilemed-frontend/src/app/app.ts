import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styleUrl: '../styles.css'
})
export class App {
  constructor(private primeng: PrimeNG) {}

  ngOnInit(){
    this.primeng.ripple.set(true);
  }
}