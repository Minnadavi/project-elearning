import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  router = inject(Router);
  isMenuOpen: boolean = false;
  
  

  isAdmin(): boolean {
    let data = localStorage.getItem('uid') ?? ""; 
    let uid: string = JSON.parse(data);
    return uid === "admin";
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logoutUser() {
    localStorage.removeItem('uid');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
