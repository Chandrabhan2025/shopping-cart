import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private roleSubject = new BehaviorSubject<string>(''); // Default empty role
  role$ = this.roleSubject.asObservable();  // Expose observable to components
  
  constructor() { }

  setRole(role: string): void {
    localStorage.setItem('role', role);
    this.roleSubject.next(role);  // Emit the new role
  }

  // Method to get the role from localStorage
  getRole(): string {
    return localStorage.getItem('role') || '';  // Return the stored role
  }
}
