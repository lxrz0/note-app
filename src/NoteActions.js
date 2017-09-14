import AppDispatcher from "./dispatcher";
import NoteConstants from "./noteconsts";

class NoteActions {
    create(text) {
        AppDispatcher.handleViewAction({
            actionType: NoteConstants.ADD_NOTE,
            text: text,
        })
    }
}