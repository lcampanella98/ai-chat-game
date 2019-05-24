import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { Message } from './model/message';
import { Event } from './model/event';

const SERVER_URL = 'ws://localhost:8999';

@Injectable()
export class GameService {
  private ws: WebSocket;

  public initSocket(): void {
    if (!this.ws) {
      this.ws = new WebSocket(SERVER_URL);
    }
  }

  public send(message: Message): void {
    this.ws.send(JSON.stringify(message));
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.ws.onmessage = (msg) => {observer.next(msg.data);};
      this.ws.onerror = observer.error.bind(observer);
      this.ws.onclose = observer.complete.bind(observer);
      return this.ws.close.bind(this.ws);
    });
  }

}
