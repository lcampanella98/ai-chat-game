import * as WebSocket from 'ws';
import {GameRoom} from './gameRoom';
import {AIPlayer, HumanPlayer, Player} from "./player";

export class GameRoomManager {
    static MIN_ROOM_SIZE: number = 5;

    rooms: GameRoom[];

    playersWaitingForRoom: HumanPlayer[];

    constructor() {
        this.rooms = [];
        this.playersWaitingForRoom = [];
    }

    playerJoinQueue(ws: WebSocket) {
        let foundExistingPlayer = false;
        for (let waitingPlayer of this.playersWaitingForRoom) {
            if (waitingPlayer.ws === ws) {
                foundExistingPlayer = true;
            }
        }
        if (foundExistingPlayer) return;

        this.playersWaitingForRoom.push(new HumanPlayer(ws));

        if (this.isQueueFull()) {
            this.newRoomFromQueue();
        }
    }

    playerLeaveQueue(ws: WebSocket) {
        for (let i = 0; i < this.playersWaitingForRoom.length; i++) {
            if (this.playersWaitingForRoom[i].ws === ws) {
                this.playersWaitingForRoom.splice(i, 1);
                return;
            }
        }
    }

    isQueueFull() {
        return this.playersWaitingForRoom.length >= GameRoomManager.MIN_ROOM_SIZE-1;
    }

    newRoomFromQueue() : GameRoom {
        const AIPos = Math.floor(Math.random()*GameRoomManager.MIN_ROOM_SIZE);
        const aiPlayer = new AIPlayer();

        const players: Player[] = [];
        let j = 0;
        for (let i = 0; i < GameRoomManager.MIN_ROOM_SIZE; i++) {
            players.push(i === AIPos ? aiPlayer : this.playersWaitingForRoom[j++]);
        }
        this.playersWaitingForRoom = [];
        return new GameRoom(players);
    }

    getPlayerFromWS(ws: WebSocket) : HumanPlayer | undefined {
        for (let room of this.rooms) {
            for (let player of room.players) {
                if (player instanceof HumanPlayer && (<HumanPlayer>player).ws === ws) {
                    return player;
                }
            }
        }
        return undefined;
    }
}