import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Modal, Form, Button} from 'react-bootstrap';


class Login extends Component {
    render() {
        return (
            <Modal {...this.props} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="font-weight-bold">
                        Masuk
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.props.handleLogin}>
                        <Form.Group>
                            <Form.Label>Alamat email</Form.Label>
                            <Form.Control type="email" name="email"
                                onChange={this.props.handleSetGlobal}
                                placeholder="Masukkan email" required/>
                            <Form.Text className="text-muted">
                                Kami tidak akan pernah menyebarkan email anda ke orang lain.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Kata sandi</Form.Label>
                            <Form.Control type="password" name="password"
                                onChange={this.props.handleSetGlobal}
                                placeholder="Masukkan kata sandi" required/>
                        </Form.Group>
                        <Button variant="warning" data-dismiss="modal" type="submit">
                            Masuk
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}


export default connect("email, password, isLoading", actions)(withRouter(Login));