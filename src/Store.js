import { EventEmitter } from "events";
// import * as Actions from "./Actions";
import AppDispatcher from "./Dispatcher";

// FROM NPM - GENERATE-PASSWORD;
import * as UID from "generate-password"

const CHANGE_EVENT = "change";

class NoteStore extends EventEmitter {
    constructor(){
        super();
        this.notes = [
            {
                id: 1,
                uid: UID.generate(),
                title: "Hey",
                content: "Welcome to the React Flux Note App, create your first note using the fields on the right. Thanks for checking it out Christian Lorza",
            },
            
        ];
    }
    
    // returns all notes in store
    getAll() {
        return this.notes;
    }
    
    // emits change event to update store
    emitChange() {
        this.emit(CHANGE_EVENT);
    }
    
    // ===================================
    // STORE METHODS
    // ===================================
    
    // create new note
    create(title, content) {
        const id = this.notes.length + 1;
        this.notes.push({
            id,
            uid: UID.generate(),
            title,
            content,
        });
        
        this.emitChange();
    }
    
    remove(index){
        this.notes.splice(index, 1);
        this.emitChange();
    }
    // ===================================
}



const Store = new NoteStore();

AppDispatcher.register((payload) => {
   switch(payload.actionType){
       case "ADD_NOTE":
           Store.create(payload.title, payload.content);
       break;
       
       case "DELETE_NOTE":
           Store.remove(payload.index);
       break; 
   } 
});


export default Store; 