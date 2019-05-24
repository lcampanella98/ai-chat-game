import * as WebSocket from 'ws';
import {GameRoom} from "./gameRoom";
import {GameConversation} from "./gameConversation";

export abstract class Player {

    name?: string;
    room?: GameRoom;
    conversation?: GameConversation;
    conversationCount: number = 0;

    joinRoom(name: string, room: GameRoom) {
        this.name = name;
        this.room = room;
        this.conversationCount = 0;
    }
    joinConversation(conv: GameConversation) {
        this.conversation = conv;
        this.conversationCount++;
    }

    abstract receivedMessage(msg: string);
    abstract endConversation(lastConversation: boolean, timeToDecide: number);

}

export class HumanPlayer extends Player {
    ws: WebSocket;
    guessed: boolean = false;
    guessAIName: string; // contains the name of the player believed to be the AI

    constructor(ws: WebSocket) {
        super();
        this.ws = ws;
    }

    joinRoom(name: string, room: GameRoom) {
        super.joinRoom(name, room);
        this.ws.send(JSON.stringify({
            msgType: 'joined_room',
            yourName: name
        }));
    }

    joinConversation(conv: GameConversation) {
        super.joinConversation(conv);
        this.ws.send(JSON.stringify({
            msgType: 'next_conversation',
            otherPlayer: conv.otherPlayer(this).name
        }));
    }

    receivedMessage(msg: string) {
        this.ws.send(JSON.stringify({
            msgType: 'received_message',
            message: msg
        }));
    }

    endConversation(lastConversation: boolean, timeToDecide: number) {
        this.ws.send(JSON.stringify({
            msgType: 'end_conversation',
            lastConversation: lastConversation,
            timeToDecide: timeToDecide
        }));
    }

}

export class AIPlayer extends Player {
    chatHistory: Message[]; // array of (player, message) pairs. latest msg at back of array

    receivedMessage(msg: string) {
        this.chatHistory.push(
            new Message(this.conversation.otherPlayer(this), msg, new Date())
        );
    }

    update(dt: number) {
        //TODO implement by calling sendMessage method of conversation member sometime
    }

    getNextMessage() : string {
        //TODO implement by calling some apis with chat history
        let myNextMsg : string = "hello world";
        this.chatHistory.push(new Message(this, myNextMsg, new Date()));
        return myNextMsg;
    }

    endConversation(lastConversation: boolean, timeToDecide: number) {

    }
}

class Message {
    constructor(public sender: Player,
                public msg: string,
                public timestamp: Date) {}
}