import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PizzaFormComponent } from './pizza-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PizzaFormStyleComponent } from './pizza-form-style.component';

@NgModule({
  declarations: [
    AppComponent,
    PizzaFormComponent,
    PizzaFormStyleComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
