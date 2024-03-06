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
      password: new FormControl('', Validators.required)
    });
  }
  
    onSubmit(form: FormGroup) {
      const newUser = {
        username: form.value.username, email: form.value.email, password: form.value.password
      };

      // Assuming you have a createuser method in your MyserviceService
      this.employeeservice.loginUser(newUser).subscribe(
        (data) => {
          alert('Login successful!');
          //this.createAdmin.reset();
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          alert('Please fill all the fields');
        }
      );
    } 
  }