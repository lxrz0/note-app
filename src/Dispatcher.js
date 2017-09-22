import { Dispatcher } from "flux";

class NoteDispatcher extends Dispatcher {
    handleViewAction(action){
        this.dispatch({
            source: "VIEW_ACTION",
            action, 
        })
    }
}

const AppDispatcher = new NoteDispatcher();

export default AppDispatcher; 