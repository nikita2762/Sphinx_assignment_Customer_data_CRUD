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
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  onSubmit(form: FormGroup) {
    if (form.valid) {
      // Your form submission logic here
      const newUser = {
        username: form.value.username,
        email: form.value.email,
        password: form.value.password
      };
  
      this.employeeservice.createUser(newUser).subscribe(
        (data) => {
          alert('Signup successful!');
          this.router.navigate(['/login']);
        },
        (error) => {
          alert('Something went wrong');
        }
      );
    } else {
      alert('Please fill in all required fields.');
    }
  }
}  