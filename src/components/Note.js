import React from "react"; 

const Note = props => {
    
    const note = props.data;
    
    return(
        <div>
            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        {note.title}
                    </p>
                </header>
                <div className="card-content">
                    <div className="content">
                        <p>{note.content}</p>
                    </div>
                </div>
              <footer className="card-footer">
                <a href="#" className="card-footer-item" 
                            onClick={(e)=>{
                                e.preventDefault();
                                props.editNote(note);
                            }}>Edit</a>
                <a href="#" 
                   className="card-footer-item" 
                   onClick={(e) => {
                       // abbr = Find Index With UID
                       e.preventDefault();
                       props.removeNote(note.uid);
                    }}>
                    Delete
                    </a>
              </footer>
            </div>
            
            <br />
        </div>
    );
}

export default Note;