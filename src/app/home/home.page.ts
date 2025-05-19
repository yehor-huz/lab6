import { UserInterface } from './../user.interface';
import { AuthService } from './../auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonButtons,
  IonModal
} from '@ionic/angular/standalone';
import { ProductListComponent } from "../product-list/product-list.component";
import { RegisterComponent } from "../register/register.component";
import { LoginComponent } from "../login/login.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonModal,
    ProductListComponent,
    RegisterComponent,
    LoginComponent
]
})
export class HomePage implements OnInit{
  authService = inject(AuthService);
  isRegisterOpen = false;
  isLoginOpen = false;
  http = inject(HttpClient)

  ngOnInit(): void {
    this.http.get<{user: UserInterface}>('https://api.realworld.io/api/users').subscribe({
      next: (response) => {
        this.authService.currentUserSignal.set(response.user);
      },
      error: () => {
        this.authService.currentUserSignal.set(null);
      },}
    );
  }

  openRegisterModal() {
    this.isRegisterOpen = true;
  }

  closeRegisterModal() {
    this.isRegisterOpen = false;
  }

  openLoginModal() {
    this.isLoginOpen = true;
  }

  closeLoginModal() {
    this.isLoginOpen = false;
  }
  logOut() {
    localStorage.setItem('token', '');
    this.authService.currentUserSignal.set(null);
  }
}