import {HumanPlayer, Player} from "./player";
import {GameConversation} from "./gameConversation";

export class GameRoom {
    static TIME_TO_CONVERSE : number = 60 * 1000; // time to converse in milliseconds
    game_states: any = {
        CONVERSING: 1,
        GUESSING: 2,
        REVEALING: 3
    };
    gameState: number;
    players: Player[];
    conversations: GameConversation[]; // we have n players who must each have n-1 conversations
    // therefore we have n(n-1)/2 total conversations
    // if n=5, we have 10 total conversations
    // how to do the pairing?
    // 1 2 3 4 5 0
    // we could pair 2-3 and 4-5, and 1 is left out the first time
    // then we pair 3-4 and 5-1, and 2 is left out
    // then we pair 1-4 and 2-5, and 3 is left out
    // then we pair 1-2 and 3-5, and 4 is left out
    // last we pair 1-3 and 2-4, and 5 is left out

    static CON_GROUPS: number[][][] = [
        [[2,3],[4,5]],
        [[3,4],[5,1]],
        [[1,4],[2,5]],
        [[1,2],[3,5]],
        [[1,3],[2,4]]
    ];
    conSeq: number[][][];
    conversationSequenceIndex: number;
    conversationTimeLeft: number = -1;

    constructor(players: Player[]) {
        this.players = players;
        for (let i = 0; i < players.length; i++) {
            players[i].joinRoom("Player " + (i+1), this);
        }
        this.conversations = [];
        this.conSeq = [...GameRoom.CON_GROUPS];
        shuffle(this.conSeq);
        this.conversationSequenceIndex = 0;
        this.gameState = this.game_states.CONVERSING;
        this.loop(0);
    }

    update(dt: number) {
        switch (this.gameState) {
            case this.game_states.CONVERSING:
                this.conversationTimeLeft -= dt;
                if (this.conversationTimeLeft <= 0) {
                    if (!this.allConversationsHad()) {
                        this.startNextConversations();
                    } else {
                        this.changeGameState(this.game_states.GUESSING);
                    }
                }
                break;
            case this.game_states.GUESSING:
                break;
            case this.game_states.REVEALING:
                break;
        }
    }

    sendTimeToGuessMessage() {

    }

    sendRevealingMessage() {

    }

    changeGameState(toState: number) {
        this.gameState = toState;
        switch (toState) {
            case this.game_states.GUESSING:
                this.sendTimeToGuessMessage();
                break;
            case this.game_states.REVEALING:
                this.sendRevealingMessage();
                break;
        }

    }


    loop(progress: number) {

        this.update(progress);

        setTimeout(this.loop.bind(this, 50), 50);
    }

    allConversationsHad() {
        return this.conversationSequenceIndex >= this.conSeq.length;
    }

    startNextConversations() {
        this.conversations = [];
        const groups: number[][] = this.conSeq[this.conversationSequenceIndex++];
        for (let grp of groups) {
            const conv = new GameConversation(
                this.players[grp[0]-1],
                this.players[grp[1]-1],
                this);
            conv.startConversation();
            this.conversations.push(conv);
        }
        this.conversationTimeLeft = GameRoom.TIME_TO_CONVERSE;
    }

    receivedMessage(player: HumanPlayer, message: string) {

    }

    playerMadeGuess(player: HumanPlayer, guessed_player: number) {

    }
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a: any[]) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}