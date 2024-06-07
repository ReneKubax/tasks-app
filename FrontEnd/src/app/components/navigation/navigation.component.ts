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
    this.isLoggedIn = !!localStorage.getItem('userEmail');
  }

    /**
   * Logs out the user by removing the 'userEmail' from the localStorage and navigating to the '/login' route.
   *
   * @return {void} This function does not return anything.
   */
  logout(): void {
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }
}
