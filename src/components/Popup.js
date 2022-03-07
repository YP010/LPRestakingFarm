import React, { Component } from 'react'
import './Popup.css'
import CloseButton from 'react-bootstrap/CloseButton'

class Popup extends Component {

    render() {
        return (
            <div >
                {this.props.trigger ?
                    <div className="popup">
                        <div className="popup-inner ml-auto mr-auto mt-5" >
                                <CloseButton variant='white' aria-label="Hide" onClick={() => {
                                    this.props.setTrigger(false)
                                }}>close
                                </CloseButton>
                                {this.props.children}
                        </div>
                    </div>
                    : ""}
            </div>
        )
    }

}

export default Popup;