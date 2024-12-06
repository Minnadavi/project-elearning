import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isRegisterActive = false;

  registerform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    specialization: new FormControl('', [Validators.required]),

  });

  loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  authService = inject(AuthService);
  router = inject(Router);
  toast = inject(ToastrService);

  login() {
    this.authService.loginUser(this.loginform.value.email!, this.loginform.value.password!).subscribe({
      next: (res: any) => {
        //for checking user data exist or not
        if (res && res.length > 0) {
          let uid = res[0]['id'];
          localStorage.setItem('uid', JSON.stringify(uid));
          this.router.navigate(['/home'], { replaceUrl: true });
        } else {
          //if user not found show the toast message
          this.toast.error('Invalid email or password');
        }
      },
      error: (err) => {
        console.log(err.error);
      }
    });
  }
  //register code
  register() {
    this.authService.getUsers().subscribe({
      next: (users: any[]) => {
        const existuser = users.some(user => user.email === this.registerform.value.email); //useremail and register email

        if (existuser) {
          this.toast.show('This email is already registered. Please use a different email!');
          //toast msg show
        } else {
          this.authService.registerUser(this.registerform.value).subscribe({
            next: (res: any) => {
              localStorage.setItem('uid', JSON.stringify(res['id'])); //store user id in local storage
              this.turnLogin();
              this.router.navigate(['/login'], { replaceUrl: true }); //redirect to login page
            },
            error: (err) => {
              console.log(err.error);
            }
          });
        }
      },
      error: (err) => {
        console.log('Error fetching users:', err); //error fetching users
      }
    });

  }

  turnRegister() {
    this.isRegisterActive = true; //toggle register form
  }

  turnLogin() {
    this.isRegisterActive = false; //toggle login form
  }


}
