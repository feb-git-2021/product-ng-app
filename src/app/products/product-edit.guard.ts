import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {
  canDeactivate(
    component: ProductEditComponent): boolean{
    if(component.productForm.dirty){
      const productName = component.productForm.get('productName').value || 'New Product'
      return confirm(`Navigate? You will loose the changes made to ${productName}`);
    }
      return true;
  }
  
}
