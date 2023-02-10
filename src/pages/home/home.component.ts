import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, NgModule, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatModule, Message, SendMessageEvent, User } from '@progress/kendo-angular-conversational-ui';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public feed: Message[] = [];

  public readonly user: User = {
    id: 1,
  };

  public readonly bot: User = {
    id: 0,
  };


  constructor(private HomeService: HomeService) {

  }

  ngOnInit(): void {
    this.feed = [{
      author: this.bot,
      timestamp: new Date(),
      text: "Hello, Sou o Chat GPT",
    } as Message];
  }

  public sendMessage(e: SendMessageEvent): void {
    const echo: Message = {
      author: this.user,
      text: `${e.message.text}`,
    };
    this.feed = [...this.feed, echo];

    this.HomeService.send(e.message.text as string).then(t => {
      const echo2: Message = {
        author: this.bot,
        text: `${t}`,
      };
      this.feed = [...this.feed, echo2];
    });
  }

}

const routes: Routes = [
  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeComponentRoutingModule { }

@NgModule({
  imports: [
    HomeComponentRoutingModule,
    ChatModule,
    HttpClientModule,
  ],
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HomeService,
    HttpClient,

  ],
})
export class HomeComponentModule { }

