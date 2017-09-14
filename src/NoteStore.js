import AppDispatcher from "./dispatcher";
import Events from "events";

const CHANGE_EVENT = "change"; 

class NoteStore extends Events.EventEmitter {
    constructor(props) {
        super(props)
        this.notes = {};
        this.dispatcherIndex = AppDispatcher.register(this.handleAction.bind(this));
    }
    
    
    // Handles actions from dispatcher
    handleAction(payload) {
        let action = payload.action;
        let text = "";
        
        switch(action.actionType) {
            
        }
    }
}