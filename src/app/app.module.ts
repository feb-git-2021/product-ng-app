import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductModule } from './products/product.module';
import { CustomerComponent } from './customers/customer.component';
import { CustomerReactiveComponent } from './customers/customer-reactive/customer-reactive.component';



@NgModule({
  declarations: [
    AppComponent,    
    HomeComponent, 
    CustomerComponent, 
    CustomerReactiveComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([      
      {path:'home',component:HomeComponent},
      {path:'customers',component:CustomerComponent},
      {path:'custreactive',component:CustomerReactiveComponent},
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'**', redirectTo:'home',pathMatch:'full'},
    
     
    ]),
    ProductModule
  ],
  providers: [],
  bootstrap: [AppComponent] //AppComponent is the root component
})
export class AppModule { }
