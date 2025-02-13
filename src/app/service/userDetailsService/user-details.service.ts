import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  constructor() { }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  // Get token from localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
