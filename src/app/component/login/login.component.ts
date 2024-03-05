import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Replace 'admin' and 'password' with your static username and password
    if (this.username === 'nikita' && this.password === 'Pass@123') {
      alert('Login successful');
      // Redirect to the 'view' page after successful login
      this.router.navigate(['/view']);
    } else {
      alert('Invalid username or password');
      this.resetForm();

    }
  }
  private resetForm(): void {
    // Clear the username and password fields
    this.username = '';
    this.password = '';
  }
}
