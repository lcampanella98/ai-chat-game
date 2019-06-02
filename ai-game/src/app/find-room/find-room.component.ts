import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";
import { NgxSpinnerService } from 'ngx-spinner';
import {Message} from "../model/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-find-room',
  templateUrl: './find-room.component.html',
  styleUrls: ['./find-room.component.css']
})
export class FindRoomComponent implements OnInit {
  waitingForRoom: boolean = false;

  constructor(private gameService: GameService,
              private spinService: NgxSpinnerService,
              private router: Router) { }

  ngOnInit() {
    this.gameService.initSocket();
    this.gameService.onJoinedRoom().subscribe((msg) => {
      this.router.navigate(['/gameRoom']);
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
