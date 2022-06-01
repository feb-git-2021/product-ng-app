import { NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { ProductEditComponent } from './product-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductEditGuard } from './product-edit.guard';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe,
    ProductEditComponent,
    
  ],
  imports: [
      ReactiveFormsModule,
      FormsModule,
      RouterModule.forChild([
      {path:'products',component:ProductListComponent},
      {
        path:'products/:id', 
        component:ProductDetailComponent,
        canActivate:[ProductDetailGuard]
        
      },
      {path:'products/:id/edit',component:ProductEditComponent,canDeactivate:[ProductEditGuard]}
    ]),
    SharedModule
  ]
})
export class ProductModule { }
