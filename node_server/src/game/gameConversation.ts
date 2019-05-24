import {Player} from "./player";
import {GameRoom} from "./gameRoom";

export class GameConversation {

    constructor(public player1: Player,
                public player2: Player,
                public gameRoom: GameRoom) {
    }

    start() {
        this.player1.joinConversation(this);
        this.player2.joinConversation(this);
    }

    end(last: boolean, timeToDecide: number) {
        this.player1.endConversation(last, timeToDecide);
        this.player2.endConversation(last, timeToDecide);
    }

    otherPlayer(me: Player) : Player {
        return me === this.player1 ? this.player2 : this.player1;
    }


    receivedMessage(sender: Player, msg: string) {
        this.otherPlayer(sender).receivedMessage(msg);
    }

}