import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy{

   title:string='Product-List!!'
   imgHeight:number=50
   imgWidth:number=50
   showImage:boolean=false
   errorMessage:string
   sub:Subscription|undefined
   //OR
   someVar !:Subscription
   
private _listFilter:string=''

get listFilter():string{
  return this._listFilter
}
set listFilter(value:string){
  this._listFilter= value;
  console.log(`In the setter :${value}`)
  this.filteredProducts =this.performFilter(value)
}

filteredProducts:IProduct[]=[]

   products:IProduct[]=[]
  //  private _productService

  // constructor(productService:ProductService) { 
  //   this._productService=productService
  // }

  //OR below is the short hand notation for injecting the service
  constructor(private _productService:ProductService) { }
  ngOnDestroy(): void {

    this.sub.unsubscribe();
  }
   
  
  ngOnInit(): void {
  //this.products =  this._productService.getProducts();
  //after productService is using HttpClient the above line will throw an error
  this.sub=this._productService.getProducts().subscribe({
  next:(products)=>{
    this.products=products
    this.filteredProducts=this.products
  },
  error:err=>this.errorMessage=err

 })

 // this.filteredProducts=this.products
    this.listFilter=''
    console.log(`The length of the products array is ${this.products.length}`)
  }

  performFilter(filterBy:string):IProduct[]{
    filterBy= filterBy.toLocaleLowerCase() //to make it case insensitive 
    return this.products.filter((p:IProduct)=>p.productName.toLocaleLowerCase().includes(filterBy))
  }

  toggleImage():void{
    this.showImage = !this.showImage
  }
  onRatingClickedParent(message:string):void{
    this.title='Product List! '+ message
  }

}
