import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from 'src/app/service/myservice.service';
import {employee} from '../employeemodel'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  // public empy:employee={} as employee;
  createCustomer: FormGroup = new FormGroup({});
  constructor(private employeeservice:MyserviceService,private router:Router) { }

  ngOnInit(): void {
   this.createCustomer = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
  }

  onSubmit(form: FormGroup){
    const newUser = {name: form.value.name, email: form.value.email, phone: form.value.phone}; 

    this.employeeservice.createCustomer(newUser).subscribe((data) => {
      alert(data.message);
      this.router.navigate(['/view']);
    }, error => {
      alert("New customer added successfully!");
    })   

   }
}