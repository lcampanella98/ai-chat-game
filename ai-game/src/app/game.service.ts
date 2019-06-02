import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import {
  EndConversationMessage,
  JoinedRoomMessage,
  Message,
  NextConversationMessage,
  ReceivedMessageMessage, RevealMessage
} from './model/message';
import { Event } from './model/event';

const SERVER_URL = 'ws://localhost:8999';

@Injectable()
export class GameService {
  private ws: WebSocket;

  myName: string;

  public initSocket(): void {
    if (!this.ws) {
      this.ws = new WebSocket(SERVER_URL);
    }
  }

  public send(message: Message): void {
    this.ws.send(JSON.stringify(message));
  }

  private onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.ws.onmessage = (msg) => {observer.next(msg.data);};
      this.ws.onerror = observer.error.bind(observer);
      this.ws.onclose = observer.complete.bind(observer);
      return this.ws.close.bind(this.ws);
    });
  }

  public onJoinedRoom(): Observable<JoinedRoomMessage> {
    return new Observable<JoinedRoomMessage>(obs => {
      this.onMessage().subscribe(msg => {
        if (msg.msgType === 'joined_room') {
          this.myName = (<JoinedRoomMessage>msg).yourName;
          obs.next(<JoinedRoomMessage>msg);
        }
      })
    });
  }

  public onNextConversation(): Observable<NextConversationMessage> {
    return new Observable<NextConversationMessage>(obs => {
      this.onMessage().subscribe(msg => {
        if (msg.msgType === 'next_conversation') obs.next(<NextConversationMessage>msg);
      })
    });
  }

  public onReceivedMessage(): Observable<ReceivedMessageMessage> {
    return new Observable<ReceivedMessageMessage>(obs => {
      this.onMessage().subscribe(msg => {
        if (msg.msgType === 'received_message') obs.next(<ReceivedMessageMessage>msg);
      })
    });
  }

  public onEndConversation(): Observable<EndConversationMessage> {
    return new Observable<EndConversationMessage>(obs => {
      this.onMessage().subscribe(msg => {
        if (msg.msgType === 'end_conversation') obs.next(<EndConversationMessage>msg);
      })
    });
  }


  public onReveal(): Observable<RevealMessage> {
    return new Observable<RevealMessage>(obs => {
      this.onMessage().subscribe(msg => {
        if (msg.msgType === 'reveal_message') obs.next(<RevealMessage>msg);
      })
    });
  }


}
