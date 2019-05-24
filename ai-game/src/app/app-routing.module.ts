import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FindRoomComponent} from "./find-room/find-room.component";

const routes: Routes = [
  {
    path: '',
    component: FindRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
