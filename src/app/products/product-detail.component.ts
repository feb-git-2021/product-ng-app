import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
title:string ='Product-Detail'
//product1:IProduct |undefined  //if strict mode is on
//else
product:IProduct
errorMessage:string
  constructor(private _activatedRoute:ActivatedRoute,
    private _router:Router,
    private _productService:ProductService) { }

  ngOnInit(): void {
 //const name = this._activatedRoute.params['id']

    const id = Number( this._activatedRoute.snapshot.paramMap.get('id')) //id in the get method should match with the parameter in the forRoot method
    console.log(`The id in details component is :${id}`)
    this.title += ` : ${id}`
  this.getProduct(id)
  }

  getProduct(id:number){
     //let localproduct
    this._productService.getProduct(id).subscribe({
      next:(product)=>this.product=product,
     
      error:(err)=>this.errorMessage=err,
      complete:()=>console.log('Reading single product completed')
    })
  }
  onBack():void{
    this._router.navigate(['/products'])
  }

}
/*
 // next:(product)=>{
      //   localproduct =JSON.stringify(product),
      //   this.product=localproduct
      //   console.log(` The next method of subscribe :${this.product}`)
      // }*/