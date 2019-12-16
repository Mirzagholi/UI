import { NgModule } from "@angular/core";
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../shared/components/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './modules/products/products.component';
import { BasketComponent } from './modules/basket/basket.component';
import { ProductDetailsComponent } from './modules/product-details/product-details.component';
import { CartComponent } from './modules/cart/cart.component';


@NgModule({
    declarations: [
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProductsComponent,
        ProductDetailsComponent,
        CartComponent
    ],
    imports: [
        BrowserAnimationsModule,
        MaterialModule
    ]
})
export class PagesModule { }
