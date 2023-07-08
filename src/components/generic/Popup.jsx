import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './generic.css'

const MODAL_BACKGOUND_ID = "modal-background"

class Popup extends Component {

    componentDidMount() {
        this.root = Object.assign(document.createElement('div'), { id: 'portal' })
        document.body.appendChild(this.root)
    }

    componentWillUnmount() {
        document.body.removeChild(this.root)
    }

    handleClick = (e) => {
        if (e.target.id === MODAL_BACKGOUND_ID) {
            this.props.onClose()
        }
    }

    render() {
        if (this.props.visible) {
            return ReactDOM.createPortal(
                <div id={MODAL_BACKGOUND_ID} onClick={this.handleClick}>
                    <div id="modal">
                        {!this.props.hideCloseButton && <div className="popup-close-btn" onClick={this.props.onClose}>&#10006;</div>}
                        {this.props.title && <><div className='modal-title'>{this.props.title}</div><hr /></>}
                        <div className="modal-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                , this.root
            )
        } else { return null }
    };
};

export default Popup;

// &#10006; or &times;