import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-reactive',
  templateUrl: './customer-reactive.component.html',
  styleUrls: ['./customer-reactive.component.css']
})
export class CustomerReactiveComponent implements OnInit {
custRForm:FormGroup
customer = new Customer()
  constructor(private fb:FormBuilder) { }
  
//CREATING REACTIVE FORMS USING FORMGROUP AND FORMCONTROL classes
  // ngOnInit(): void {
  //   this.custRForm= new FormGroup({
  //     firstName:new FormControl(),
  //     lastName:new FormControl(),
  //     email:new FormControl(),
  //     sendCatalog:new FormControl(true),
  //     city:new FormControl()

  //   })
  // }

//CREATING REACTIVE FORMS USING THE SERVICE OF @Angular/form FormBuilder
  ngOnInit(): void {
    this.custRForm= this.fb.group({
      firstName:['',[Validators.required,Validators.minLength(3)]],
      lastName:['',[Validators.required,Validators.maxLength(30)]],
      email:['',[Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      sendCatalog:true,
      city:''
    })
  }
  showData(){
    this.custRForm.patchValue({
      firstName:'Jack',
      lastName:'Jill'
      // email:'jack@gmail.com',
      // sendCatalog:false,
      // city:'New york'

    })
  }
  save(){
    console.log(this.custRForm)
    console.log(`Saved Data of REACTIVE form ${JSON.stringify(this.custRForm.value)}`)
  }

}
