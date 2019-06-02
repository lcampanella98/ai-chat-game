export class Message {
  msgType: string
}

export class JoinedRoomMessage extends Message {
  yourName: string;
}

export class NextConversationMessage extends Message {
  otherPlayer: string;
}

export class ReceivedMessageMessage extends Message {
  message: string;
}

export class EndConversationMessage extends Message {
  lastConversation: boolean;
  timeToDecide: number;
}

export class RevealMessage extends Message {
  aiPlayerName: string;
  wasCorrect: boolean;
  numCorrectGuesses: number;
  numIncorrectGuesses: number;
}

