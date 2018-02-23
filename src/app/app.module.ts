import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EventHistoryComponent } from './event-history/event-history.component';
import { BuyLotteryComponent } from './buy-lottery/buy-lottery.component';
import { AppService } from './app.service';
import { Web3Service } from './util/web3.service';

@NgModule({
  declarations: [
    AppComponent,
    EventHistoryComponent,
    BuyLotteryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [AppService,Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
