import {Component, Input, OnInit} from '@angular/core';
import {GameService} from '../game.service';
import {NgxSpinnerService} from "ngx-spinner";
import {Conversation} from "../model/conversation";
import {RevealMessage} from "../model/message";
@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.css']
})
export class GameRoomComponent implements OnInit {

  @Input() myName: string;
  conv: Conversation = undefined;
  allConversations: Conversation[];
  convIndex: number = 0;
  deciding: boolean = false;
  timeToDecide: number;
  gameReveal: RevealMessage;
  math = Math;

  constructor(private gameService: GameService,
              private spinService: NgxSpinnerService) {

  }

  ngOnInit() {
    this.gameService.initSocket();
    this.gameService.onEndConversation().subscribe(msg => {
      this.allConversations[this.convIndex++] = this.conv;
      this.conv = undefined;
      if (msg.lastConversation) {
        this.deciding = true;
        this.timeToDecide = msg.timeToDecide;
      }
      this.spinService.show();
    });
    this.gameService.onNextConversation().subscribe(msg => {
      this.conv = new Conversation(this.gameService.myName, msg.otherPlayer);
      this.spinService.hide();
    });
    this.gameService.onReceivedMessage().subscribe(msg => {
      if (this.conv) {
        this.conv.newMessage(msg.message, this.conv.otherPlayer);
      }
    });
    this.gameService.onReveal().subscribe(msg => {
      this.gameReveal = msg;
      this.spinService.hide();
    });
  }

}
