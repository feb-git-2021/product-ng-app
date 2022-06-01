import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Customer } from './customer';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
customer=new Customer()
  constructor() { }

  ngOnInit(): void {
  }
  save(custForm :NgForm){
    console.log(custForm.form)
    console.log(`Saved Customer Data :${JSON.stringify(custForm.value)}` )

  }

}
