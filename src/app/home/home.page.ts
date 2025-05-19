import { Component, inject } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton,
  IonButtons,
  IonModal,
  IonMenu,
  IonMenuButton,
  IonIcon
} from '@ionic/angular/standalone';
import { ProductListComponent } from "../product-list/product-list.component";
import { RegisterComponent } from "../register/register.component";
import { LoginComponent } from "../login/login.component";
import { AuthService } from '../auth.service';
import { addIcons } from 'ionicons';
import { logInOutline, logOutOutline, personAddOutline } from 'ionicons/icons';

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
    IonMenu,
    IonMenuButton,
    IonIcon,
    ProductListComponent,
    RegisterComponent,
    LoginComponent
  ]
})
export class HomePage {
  authService = inject(AuthService);
  isRegisterOpen = false;
  isLoginOpen = false;

  constructor() {
    // Додаємо іконки
    addIcons({ logInOutline, logOutOutline, personAddOutline });
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
    this.authService.logout();
  }

  get isAuthenticated(): boolean {
    return this.authService.currentUserSignal() !== null;
  }

  get currentUser(): string {
    return this.authService.currentUserSignal()?.username || '';
  }
}