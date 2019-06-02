export class Conversation {
  messages: ConversationMessage[];
  constructor(public yourName: string, public otherPlayer: string) {
    this.messages = [];
  }
  newMessage(msg: string, sender: string) {
    this.messages.push(new ConversationMessage(sender, msg));
  }
  copy() : Conversation {
    let conv: Conversation = new Conversation(this.yourName, this.otherPlayer);
    conv.messages = this.messages.slice();
    return conv;
  }
}

export class ConversationMessage {
  constructor(public sender: string, public msg: string) {}
}
