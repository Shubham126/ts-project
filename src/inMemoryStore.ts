import { Chat, Store, UserId } from "./store/Store";
let globalChatId = 0;

export interface Room{
    roomId: string;
    chats: Chat[];
}

export class inMemoryStore implements Store{
    private store: Map<String, Room>;

    constructor(){
        this.store = new Map<string, Room>()

    }
    initRoom(roomId: string){
        this.store.set(roomId, {
            roomId,
            chats: []
        })

    }

    //last 50 chats => limit = 50, offset - 0
    //limit = 50, offset - 50
    getChats(roomId: string, limit: number, offset: number){
        const room = this.store.get(roomId);
        if(!room){
            return []
        }

        return room.chats.reverse().slice(0, offset).slice(-1*limit);
    }
    addChat(userId: UserId, name: string, roomId: string, message: string){
        const room = this.store.get(roomId);
        if(!room){
            return 
        }
        room.chats.push({
            id: (globalChatId ++).toString(),
            userId,
            name,
            message,
            upvotes:[]
        });
    }
    upvote(userId : UserId, roomId: string, chatId: string){
        const room = this.store.get(roomId);
        if(!room){
            return 
        }
        // todo: Make this faster
        const chat = room.chats.find(({id}) => id ===chatId);

        if (chat) {
            chat.upvotes.push(chatId);
        }
    }
}