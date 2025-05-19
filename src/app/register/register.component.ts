import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { IonItem, IonInput, IonButton, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
  ,
  imports: [IonLabel, IonButton, IonInput, IonItem, IonButton, IonLabel, IonItem, IonInput, ReactiveFormsModule ]
})
export class RegisterComponent {
  @Output() success = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
  
  registerForm: FormGroup;
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid || this.isLoading) return;

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = this.authService.register(this.registerForm.value);
      localStorage.setItem('token', response.user.token);
      this.authService.currentUserSignal.set(response.user);
      this.success.emit();
      this.router.navigateByUrl('/');
    } catch (err) {
      this.errorMessage = err instanceof Error ? err.message : 'Registration failed';
    } finally {
      this.isLoading = false;
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
