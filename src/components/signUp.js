import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Modal, Navbar, Nav, Form, Button, InputGroup, FormControl} from 'react-bootstrap';


class SignUp extends Component {
    render() {
        return (
            <Modal {...this.props} size="lg" centered>
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                    SIGN UP
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>SIGN UP Modal</h4>
                    <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={() => this.props.setModal(false)}>Close</Button> */}
                </Modal.Footer>
            </Modal>
        );
    }
}


export default connect("keyword, category, modalShow", actions)(withRouter(SignUp));