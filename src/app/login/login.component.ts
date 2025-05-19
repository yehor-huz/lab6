import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { IonItem, IonLabel, IonInput, IonButton, IonList } from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../user.interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonLabel, IonInput, IonButton, ReactiveFormsModule ],
  providers: [FormBuilder]
})
export class LoginComponent {
  @Output() success = new EventEmitter<void>();
  http = inject(HttpClient);
  loginForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.nonNullable.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]]
      }
    );
   }

  onSubmit(): void{
    this.http.post<{user: UserInterface}>('https://api.realworld.io/api/users/login', {
      user: this.loginForm.getRawValue(),
    }).subscribe(
      (response) => {
        localStorage.setItem('token', response.user.token);
        this.authService.currentUserSignal.set(response.user);
        this.success.emit();
        this.router.navigateByUrl('/');
      }
    )
  }

}