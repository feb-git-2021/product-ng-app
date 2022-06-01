import { Injectable } from '@angular/core';
import { IProduct } from './product';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http'
import { Observable, of, throwError } from 'rxjs';
import {tap,catchError, map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
//@Injectable()
export class ProductService {
  //productUrl :string ='assets/api/products/products.json'
  productUrl:string='https://localhost:7036/api/products'
 // productUrl:string='https://localhost:44311/api/Products'
  products:IProduct[]=[]
 


  constructor(private _httpClient:HttpClient) { }



  getProducts():Observable<IProduct[]>{
//let res =this._httpClient.get<IProduct[]>(this.productUrl).toPromise()
//console.log(res)
   return this._httpClient.get<IProduct[]>(this.productUrl)
   .pipe(
     tap((data)=>console.log(`All Products : ${JSON.stringify(data)}`)),
     catchError(this.handleError)
   )
  }
  getProduct(id:number):Observable<IProduct>{
    return this.getProducts().pipe(
      map((products:IProduct[])=>products.find(p=>p.productId===id)),
      catchError(this.handleError)
    )
  }

  // getProduct(id:number):Observable<IProduct>{
  //  const url=`${this.productUrl}/?id=${id}`
  //  console.log(url)
  //  return this._httpClient.get<IProduct>(url)
  //  .pipe(
  //    tap(data=>console.log(`Product with ${id} is ${JSON.stringify(data)}`)),
  //    catchError(this.handleError)
  //  )
  // }

  updateProduct(product:IProduct):Observable<IProduct>{
   const headers = new HttpHeaders({'Content-Type':'application/json'})
   const url = `${this.productUrl}/?id=${product.productId}`
   return this._httpClient.put<IProduct>(url,product,{headers})
   .pipe(
     tap(()=>console.log(`Update Product : ${product.productId}`),
     map(()=>product)),
     catchError(this.handleError)
   )

  }
  createProduct(product:IProduct):Observable<IProduct>{
    const headers = new HttpHeaders({'Content-Type':'application/json'})
    product.productId =null
    return this._httpClient.post<IProduct>(this.productUrl,product,{headers})
    .pipe(
      tap(data=>console.log(`Create Product: ${JSON.stringify(data)}`)),
      catchError(this.handleError)
    )
  }
  deleteProduct(id:number):Observable<{}>{
    const headers = new HttpHeaders({'Content-Type':'application/json'})
    const url = `${this.productUrl}/?id=${id}`
    return this._httpClient.delete(url,{headers})
    .pipe(
      tap(data=>console.log(`Delete Product: ${IDBIndex}`)),
      catchError(this.handleError)
    )
    
  }


  private handleError(err:HttpErrorResponse){
    return throwError(err)

  }
}
