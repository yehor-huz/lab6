import { Injectable, signal } from '@angular/core';
import { AuthResponse, User } from './user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserSignal = signal<User | null>(null);
  private readonly USERS_KEY = 'registered_users';

  constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      const users = this.getUsers();
      const user = users.find(u => u.token === token);
      if (user) {
        this.currentUserSignal.set(user);
      }
    }
  }

  private getUsers(): User[] {
    const usersJson = localStorage.getItem(this.USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  register(user: Omit<User, 'id' | 'token'>): AuthResponse {
    const users = this.getUsers();
    
    if (users.some(u => u.email === user.email)) {
      throw new Error('Email already exists');
    }

    if (users.some(u => u.username === user.username)) {
      throw new Error('Username already exists');
    }

    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      token: this.generateToken()
    };

    users.push(newUser);
    this.saveUsers(users);
    
    return { user: newUser };
  }

  login(credentials: { email: string; password: string }): AuthResponse {
    const users = this.getUsers();
    const user = users.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    return { user };
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSignal.set(null);
  }

  private generateToken(): string {
    return Math.random().toString(36).substring(2) + 
           Date.now().toString(36);
  }
}