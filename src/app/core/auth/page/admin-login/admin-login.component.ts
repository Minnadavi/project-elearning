import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {

  router = inject(Router);
  toast = inject(ToastrService);

  /// login  form code validation rules
  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  // name=admin,password=password
  login() {
    if (this.loginForm.value.name === 'admin' && this.loginForm.value.password === 'password') {
      //set uid as admin to identify admin
      localStorage.setItem('uid', JSON.stringify('admin'));
      // navigate to home page and replace route 
      this.router.navigate(['/home'], { replaceUrl: true });
    } else {
      this.toast.error('invalid user or password', 'ERROR');
      //toast=box contact display avum
    }
  }

}
