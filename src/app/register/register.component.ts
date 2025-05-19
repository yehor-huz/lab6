import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { IonItem, IonLabel, IonInput, IonButton, IonList } from "@ionic/angular/standalone";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../user.interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonLabel, IonInput, IonButton, ReactiveFormsModule ],
  providers: [FormBuilder]
})
export class RegisterComponent {
  @Output() success = new EventEmitter<void>();
  http = inject(HttpClient);
  registerForm: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.nonNullable.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]]
      }
    );
   }

  onSubmit(): void{
    this.http.post<{user: UserInterface}>('https://api.realworld.io/api/users', {
      user: this.registerForm.getRawValue(),
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
