import AppDispatcher from "./Dispatcher";

export function create(title, content) {
    AppDispatcher.dispatch({
        actionType: "ADD_NOTE",
        title,
        content, 
    })
};

export function remove(index){
    AppDispatcher.dispatch({
        actionType: "DELETE_NOTE",
        index, 
    })
}