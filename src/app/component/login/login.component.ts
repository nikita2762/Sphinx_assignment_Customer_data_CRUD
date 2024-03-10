import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MyserviceService } from 'src/app/service/myservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Update to use FormGroup
  loginuser: FormGroup   = new FormGroup({});
  constructor(private employeeservice: MyserviceService, private router: Router) { }

  ngOnInit() {
    // Initialize the form in the component's ngOnInit
    this.loginuser = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  
    onSubmit(form: FormGroup) {
      const newUser = {
        username: form.value.username, 
        email: form.value.email, 
        password: form.value.password
      };

      if (!newUser.email || !newUser.password) {
        alert('Please fill in both email and password fields.');
      } else {
        this.employeeservice.loginUser(newUser).subscribe(
          (data) => {
            // Assuming the server returns a success response
            alert('Login successful!');
            // this.createAdmin.reset();
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            if (error.status === 401) {
              const errorResponse = error.error;
              if (errorResponse && errorResponse.message === 'Wrong email') {
                alert('Invalid email. Please check your email address.');
              } else if (errorResponse && errorResponse.message === 'Wrong password') {
                alert('Invalid password. Please check your password.');
              } else if (errorResponse && errorResponse.message === 'Missing fields') {
                alert('Please fill in both email and password fields.');
              } else {
                alert('Invalid credentials. Please check your email and password.');
              }
            } else {
              alert('An error occurred. Please try again later.');
            }
          }
        );
      }
    } 
  }