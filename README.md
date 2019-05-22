# ai-chat-game

###Description:
Match players up into groups of four or five and give each player
one minute to chat with each of the other players through text. 
All but one player is a bot. The objective is to identify the single bot
among the humans. 

###Gameplay States:
After user enters the game, they enter the waiting state, from which they 
can be matched up with a player to chat with for some amount of time. This is
the chatting state.

After that time expires, they enter the waiting state again, waiting to be matched
up with the next player. Therefore, if there are a total of n players who each have
n-1 conversations, each user will be in the waiting state and the chatting state n-1
times. After the final chatting state, each real user must select who they think
the bot is within 30 seconds. This is the deciding state. 
After that, the user is shown whether they got it right, 
and how many of the other users got it right. 

Diagram:

(Finding Game) --> (Waiting) --> (n-1) <-- (Chatting) --> (Deciding) --> (End)
             

###Messages per state:
####Finding Game (Incoming)
* join_room
* found_room (player_info, other_players)
####Waiting (Incoming):
* next_conversation (player_num, time_to_converse)
####Chatting (Incoming):
* received_message (msg)
* end_conversation (lastConversation ? move to Deciding, else move to Waiting, time_to_decide)
####Chatting (Outgoing):
* send_message (msg)
####Deciding (Incoming):
* time_up
####Deciding (Outgoing):
* make_decision (selected_player)
####End (Incoming):
* statistics (num_correct, num_incorrect)