import * as WebSocket from 'ws';
import {GameRoomManager} from '../game/gameRoomManager';
import {HumanPlayer, Player} from "../game/player";

const gameRoomManager = new GameRoomManager();

export function onClientConnect(ws: WebSocket) {
    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        const data = JSON.parse(message);
        if (!data.msgType) {
            return;
        }
        if  (data.msgType === 'find_room') {
            gameRoomManager.playerJoinQueue(ws);
        } else if (data.msgType === 'cancel_find_room') {
            gameRoomManager.playerLeaveQueue(ws);
        } else if (data.msgType === 'send_message') {
            const player: HumanPlayer = gameRoomManager.getPlayerFromWS(ws);
            if (player) {
                player.room.receivedMessage(player, data.message as string);
            }
        } else if (data.msgType === 'make_decision') {
            const player: HumanPlayer = gameRoomManager.getPlayerFromWS(ws);
            if (player) {
                player.room.playerMadeGuess(player, parseInt(data.guessed_player));
            }
        }
    });

    //send immediatly a feedback to the incoming connection
    //ws.send('Hi there, I am a WebSocket server');
}

