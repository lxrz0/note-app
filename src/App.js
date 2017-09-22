// @Copyright Christian Lorza 2017

import React, { Component } from "react";
import Store from "./Store";
import * as Actions from './Actions';
import Note from "./components/Note";
import Modal from "./components/Modal"
import "bulma/css/bulma.css";

const change_event = "change";

class App extends Component {
    constructor(){
        super();
        this.state = {
            notes: Store.getAll(),
            titleInput: "",
            contentInput: "",
        }
        
        this.notification = {
            error: false, 
            message: "there was some sort of error",
        }
        
        this.edit = {
            editing: false,
            uid: null,
            note: {},
            error: "",
            pending: false,
            index: null,
        }
        
        this.removeNote = this.removeNote.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.submitNote = this.submitNote.bind(this);
        this.editNote = this.editNote.bind(this);
        
            
    }
    
    componentDidMount(){
        Store.on(change_event, () => {
            Store.getAll();
            this.forceUpdate();
        })
    }
    
    handleTitleChange(e){
        this.setState({titleInput: e.target.value})
    }
    
    handleContentChange(e) {
        this.setState({contentInput: e.target.value});
    }
    
    // EDIT UPDATE + SAVE NOTE
    editNote(note) {
        if(this.edit.editing === true) {
            this.edit.pending = true;
            this.forceUpdate();
        }
        
        if(this.edit.editing === false) {
            // get index of note
            const index = this.state.notes.map(n => {
                return n.uid
            }).indexOf(note.uid);
            
            this.edit = {
                editing: true,
                uid: note.uid,
                note: note,
                index: index,
            }
            
            this.setState({
                titleInput: note.title,
                contentInput: note.content,
            })
            
            this.forceUpdate()
            return;
        }
        
        
        
    }
    
    save(note, index) {
        if(this.edit.editing === true) {
            note.title = this.state.titleInput;
            note.content = this.state.contentInput;
            this.edit = {
                editing: false,
                uid: null,
                note: {},
                index: null,
            }
            this.setState({
                titleInput: "",
                contentInput: "",
            });
            
            this.forceUpdate();
        }
    }
    // ==========================
    
    // title / content
    submitNote(t, c) {
        
        this.setState({
            contentInput: "",
            titleInput: "",
        });
        
        if(t === "" || c === "") {
            this.notification.error = true;
            this.notification.message = "You left the title or content fields empty, please fill in all fields";
            return;
        } else {
            this.notification.error = false;
            this.notification.message = "";
        }
        
        Actions.create(t, c);
    }
    
    removeNote(uid){
        
        const index = this.state.notes.map((note) => {
            return note.uid
        }).indexOf(uid);
        
        console.log("Selected Note: ", uid, "\nIndex: ", index);
        Actions.remove(index);
    }
    
    
    
    render(){
        
        return(
            
            <div className="container">
                <section className="hero">
                  <div className="hero-body">
                      <h1 className="title">
                        Note App
                      </h1>
                      <h2 className="subtitle">
                        Made with React.js and Flux
                      </h2>
                      
                      <p>
                        Hey there, thanks for checking out my app.
                        I've been looking into React for the last 2 weeks as well as the flux pattern.
                        Saw an article online on ways to practice and put my new found knowledge to use,
                        so I went for the conventional note app. It served as a great challenge. Needless to say
                        its not perfect, but it works. Didn't stay true to Flux the whole way through, but I can come
                        back and update at any time.
                        <br /><br />20:24, Friday 22nd September 2017<br />Christian Lorza
                        <hr />
                      </p>
                  </div>
                </section>
                <Modal edit={this.edit}/>
                <br /><br />
                
                {
                    this.edit.editing == true?
                    <div className="notification is-success">
                        You are currently editing the note: {this.edit.uid}
                    </div>
                    :
                    null
                }
                
                <div className="columns">
                    <div className="column is-one-third">
                        {
                            this.state.notes.length > 0 ?
                            this.state.notes.map(note => {
                                return <Note
                                            data={note}
                                            id={note.id}
                                            key={note.uid}
                                            editNote={this.editNote}
                                            removeNote={this.removeNote}
                                        />
                            })
                            :
                            <div className="notification is-warning">
                              There are no notes
                            </div>
                        }
                    </div>
                    
                    <div className="column">
                        {
                            this.edit.pending && this.edit.editing ? 
                            <div className="notification is-danger">
                                Please save changes before trying to edit another note
                            </div>
                            :
                            null
                        }
                        
                        {
                            this.notification.error ? 
                            <div className="notification is-warning">
                                {this.notification.message}
                            </div>
                            :
                            null
                        }
                        
                        <div className="field">
                            <div className="control">
                                <input type="text" 
                                       className="input" 
                                       placeholder="Title"
                                       value={this.state.titleInput}
                                       onChange={this.handleTitleChange}
                                />
                            </div>
                        </div>
                        
                        <div className="field">
                            <div className="control">
                                <textarea className="textarea" 
                                          placeholder="Note..."
                                          value={this.state.contentInput}
                                          onChange={this.handleContentChange}
                                />
                            </div>
                        </div>
                        
                        <div className="field">
                            <div className="control">
                                {
                                    this.edit.editing === false ?
                                    <button className="button" 
                                        onClick={() => {
                                            const title = this.state.titleInput;
                                            const content = this.state.contentInput;
                                            this.submitNote(title, content);
                                    }}>Add Note</button>
                                    :
                                    <button className="button" 
                                        onClick={() => {
                                            this.save(this.edit.note, this.edit.index);
                                            
                                    }}>Save Changes</button>
                                    
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;