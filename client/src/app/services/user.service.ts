import { Injectable, OnDestroy } from "@angular/core";
import { ConnectionService } from "./connection.service";
import { Subscription } from "rxjs";

@Injectable()
export class UserService implements OnDestroy {
  private readonly TOKEN_STORAGE_KEY = 'jwt';
  private readonly subscription = new Subscription();
  userId: string = '';

  constructor(private connection: ConnectionService) {
    const token = this.getToken();
    if (token) {
      this.userId = this.getUserIdFromToken(token);
    }

    this.subscription.add(this.connection.token$.subscribe(token => {
      this.setToken(token);
      this.userId = this.getUserIdFromToken(token);
    }));
    this.subscription.add(this.connection.connect$.subscribe(() => {
      const token = this.getToken();
      this.connection.emit('auth', token);
    }));
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_STORAGE_KEY);
  }

  setToken(value: string) {
    localStorage.setItem(this.TOKEN_STORAGE_KEY, value);
  }

  private getUserIdFromToken(token: string): string {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const { id } = JSON.parse(jsonPayload);
    return id;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
