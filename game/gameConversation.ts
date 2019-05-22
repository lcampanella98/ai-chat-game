import {Player} from "./player";
import {GameRoom} from "./gameRoom";

export class GameConversation {

    constructor(public player1: Player,
                public player2: Player,
                public gameRoom: GameRoom) {
    }

    startConversation() {
        this.player1.joinConversation(this);
        this.player2.joinConversation(this);
    }

    otherPlayer(me: Player) : Player {
        return me === this.player1 ? this.player2 : this.player1;
    }


    receivedMessage(sender: Player, msg: string) {
        // TODO: implement this method
    }

}