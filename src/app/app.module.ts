import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoalitionComponent} from './components/coalition/coalition.component';
import {PartyListComponent} from './components/party-list/party-list.component';
import {PartyTableComponent} from './components/party-table/party-table.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {CoalitionCalculatorService} from './services/coalition-calculator.service';

@NgModule({
  declarations: [
    AppComponent,
    CoalitionComponent,
    MainPageComponent,
    PartyListComponent,
    PartyTableComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule
  ],
  providers: [CoalitionCalculatorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
