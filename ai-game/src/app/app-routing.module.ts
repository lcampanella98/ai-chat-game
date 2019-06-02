import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FindRoomComponent} from "./find-room/find-room.component";
import {GameRoomComponent} from "./game-room/game-room.component";

const routes: Routes = [
  {
    path: '',
    component: FindRoomComponent
  },
  {
    path: 'gameRoom/',
    component: GameRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
