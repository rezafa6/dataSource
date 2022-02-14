import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
//components 
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TableActionsComponent } from './home/table-actions/table-actions.component';
// material ui modules
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
// other modules
import { ToastrModule } from 'ngx-toastr';

const materialModuls = [MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule,
  MatTooltipModule , MatCheckboxModule]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TableActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    // material
    ...materialModuls
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
