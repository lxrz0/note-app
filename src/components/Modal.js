import React from "react";



const Modal = props => {
    
    return(
        <div className="modal">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Oops?</p>
              <button className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
                You sure you want to close without saving? 
            </section>
            <footer className="modal-card-foot">
              <button className="button is-success">Save changes</button>
              <button className="button">Close</button>
            </footer>
          </div>
        </div>
    );
}

export default Modal;