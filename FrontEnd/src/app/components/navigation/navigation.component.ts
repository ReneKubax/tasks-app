import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = !!localStorage.getItem('userEmail'); // Verifica si el usuario está logeado
  }

  logout(): void {
    localStorage.removeItem('userEmail'); // Elimina el email del localStorage al hacer logout
    this.router.navigate(['/login']);
  }
}
