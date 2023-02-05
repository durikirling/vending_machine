import React, { Component } from 'react';

class Popup extends Component {
    render() {
        return (
            <div>
                {this.props.visible &&
                    <div
                        id="modal-background"
                        className="modal-background"
                    >
                        <div className="modal">
                            {this.props.title && <><div style={{ color: 'black' }}>{this.props.title}</div><hr /></>}
                            <div className="modal-content">
                                {this.props.children}
                            </div>
                            <div className="x-btn" onClick={this.props.closeForm}>&#10006;</div>
                        </div>
                    </div>
                }
            </div>
        )
    };
};

export default Popup;

// &#10006; or &times;