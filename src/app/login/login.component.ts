import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IonButton, IonLabel, IonItem, IonInput } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonButton, IonLabel, IonItem, IonInput, ReactiveFormsModule ]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = this.authService.login(this.loginForm.value);
      localStorage.setItem('token', response.user.token);
      this.authService.currentUserSignal.set(response.user);
      this.router.navigateByUrl('/');
    } catch (err) {
      this.errorMessage = err instanceof Error ? err.message : 'Login failed';
    } finally {
      this.isLoading = false;
    }
  }
}