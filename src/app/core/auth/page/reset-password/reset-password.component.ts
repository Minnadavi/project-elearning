import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  authService = inject(AuthService);
  userExist: boolean = false;
  toast = inject(ToastrService);
  router = inject(Router);
  userID: string = '';

  resetform: any = {
    email: '',
    password: ''
  }


  checkUser() {
    if (!this.resetform.email) return;
    this.authService.getUserByEmail(this.resetform.email).subscribe({
      next: (data: any) => {
        console.log(data);
        if (data.length > 0) {
          this.userID = data[0]['id'];
          this.userExist = true;
        } else {
          this.toast.error("User not found");
        }
      },
      error: (error) => {
        console.log(error.error);
      }
    });
  }

  resetPassword() {
    if (!this.userID) return;
    this.authService.resetPassword(this.userID, this.resetform.password).subscribe({
      next: (data: any) => {
        console.log(data);
        this.userID = '';
        this.toast.success("Password reset successfully");
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.log(error.error);
      }
    });
  }

}
