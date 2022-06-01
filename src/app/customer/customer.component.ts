import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  template: `
  <h1>Customer Component With inline template</h1>
 
    <p>
      Inline template should be used if the html of the component is very simple of just one
       or two html tags
    </p>
  `,
  styles: [
    `
    h1{
      background-color:red;
      color:white;

    }
    `
  ]
})
export class CustomerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
