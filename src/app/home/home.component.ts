import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// decorator function in Angular used to define the metadata 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// handle any additional initialization tasks - Oninit
export class HomeComponent implements OnInit {

  constructor() { }  //dependency injection

  ngOnInit(): void {
  }

}
