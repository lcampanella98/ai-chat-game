import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";
import { NgxSpinnerService } from 'ngx-spinner';
import {Message} from "../model/message";

@Component({
  selector: 'app-find-room',
  templateUrl: './find-room.component.html',
  styleUrls: ['./find-room.component.css']
})
export class FindRoomComponent implements OnInit {
  waitingForRoom: boolean = false;

  constructor(private gameService: GameService, private spinService: NgxSpinnerService) { }

  ngOnInit() {
    this.gameService.initSocket();
    this.gameService.onMessage().subscribe((msg) => {
      console.log(msg);
    });
  }

  findGame() {
    this.gameService.send({
      msgType: "find_room"
    });
    this.spinService.show();
    this.waitingForRoom = true;
  }

  cancelFindGame() {
    this.gameService.send({
      msgType: "cancel_find_room"
    });
    this.spinService.hide();
    this.waitingForRoom = false;
  }

}
