import { UserInterface } from './user.interface';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSignal = signal <UserInterface | undefined | null>(undefined);
}
