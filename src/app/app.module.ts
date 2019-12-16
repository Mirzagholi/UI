import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { PagesModule } from './pages/pages.module';
import { MaterialModule } from './shared/components/material.module';
import { MenuComponent } from './shared/layout/menu/menu.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { BasketComponent } from './pages/modules/basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    MenuComponent,
    HeaderComponent,
    BasketComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
