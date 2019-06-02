import {Component, Input, OnInit} from '@angular/core';
import {Conversation} from "../model/conversation";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Input() conversation: Conversation;
  @Input() active: boolean;

  constructor() { }

  ngOnInit() {

  }

}
