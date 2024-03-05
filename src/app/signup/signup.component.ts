import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/service/myservice.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  createuser: FormGroup  = new FormGroup({});
  constructor(private employeeservice: MyserviceService, private router: Router) { }


  
  ngOnInit(): void {
    this.createuser = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit(form: FormGroup) {
      const newUser = {
        username: form.value.username, email: form.value.email, password: form.value.password
      };

      // Assuming you have a createuser method in your MyserviceService
      this.employeeservice.createUser(newUser).subscribe(
        (data) => {
          alert('Signup successful!');
          //this.createAdmin.reset();
          this.router.navigate(['/view']);
        },
        (error) => {
          alert('Something went wrong');
        }
      );
    } 
  }

