import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NumberValidators } from '../shared/number.validator';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title:string='Edit-Product'
  productForm : FormGroup
  errorMessage:string
  displayMessage :{[key:string]:string}={}
  private validationMessages:{[key:string]:{[key:string]:string}}
  sub:Subscription
  product:IProduct


  constructor(private fb:FormBuilder,
    private _productService:ProductService,
    private _router:Router,
    private _activateRoute :ActivatedRoute) { 

    this.validationMessages={
      productName:{
        required:'Product Name is required',
        minlength:'Product Name should be of at least 3 characters',
        maxlength:'Product name cannot exceed 30 characters'
      },
      productCode:{
        required:'Product code is mandatory'
      },
      releaseDate:{
        required:'Release Date is mandatory',
        pattern:'Incorrect date pattern'
      },
      price:{
        required:'price of product is mandatory'
      },
      starRating:{
        range:'Product rating lies between 1 (lowest) and 5 (highest)'
      }
    }
  }



  ngOnInit(): void {
    this.productForm=this.fb.group({
      productName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(30)]],
      productCode:['',Validators.required],
      releaseDate:['',[Validators.required,Validators.pattern('')]],
      price:['',Validators.required],
      starRating:['',NumberValidators.range(1,5)],
      description:''

    })
    //Read the productId from the route parameter
    this.sub= this._activateRoute.paramMap.subscribe(
      params=>{
        const id = +params.get('id')   //+ plus sign converts string to number
        this.getProduct(id)
        
      }
      
    )
    

  }
  getProduct(id:number){
    this._productService.getProduct(id)
    .subscribe({
      next:(product:IProduct)=>this.displayProduct(product),
      error:err=>this.errorMessage = err
    })
    
  }

  displayProduct(product:IProduct):void{
    if(this.productForm){
      this.productForm.reset();
    }
    this.product=product;
    if(this.product.productId === 0){
      this.title='Add New Product'
    }else{
      this.title=`Edit Product: ${this.product.productName}`
    }
    //update the data of the form
    this.productForm.patchValue({
      productName:this.product.productName,
      productCode:this.product.productCode,
      releaseDate:this.product.releaseDate,
      price:this.product.price,
      starRating:this.product.starRating,
      description:this.product.description
    });

   
  }
  saveProduct(){
    if(this.productForm.valid){
      if(this.productForm.dirty){
        const p = {...this.product, ...this.productForm.value}
        if(p.id === 0){
            //call the create product method from the product service
            this._productService.createProduct(p)
            .subscribe({
              next:()=>this.onSaveComplete() ,
              error:err=>this.errorMessage=err
            })
        }else{
          this._productService.updateProduct(p)
          .subscribe({
            next:()=>this.onSaveComplete() ,
            error:err=>this.errorMessage=err
          })
        }
        
      }
      else{
        this.onSaveComplete()
      }
    }else{
      this.errorMessage=`Please correct all the validation errors`
    }

  }
  onSaveComplete():void{
    this.productForm.reset();
    this._router.navigate(['/products'])

  }
  deleteProduct(){
    if(this.product.productId ===0){
      //dont delte, it was never saved
      this.onSaveComplete()
    }else{
      if(confirm(`Do you really want to delte the product  ${this.product.productId} ?`)){
        this._productService.deleteProduct(this.product.productId)
        .subscribe({
          next:()=>this.onSaveComplete(),
         error:err=>this.errorMessage = err
        })
      }
    }
  }
}
