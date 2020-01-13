import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Modal, Form, Button} from 'react-bootstrap';
import axios from 'axios';


class Login extends Component {
    async handleLogin(event) {
        store.setState({isLoading: true});
        event.preventDefault();
        // tembak api
        await axios.put("http://localhost:5000/api/auth", {
                email: this.props.email,
                password: this.props.password
            }
        )
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isLogin", true);
            console.log(localStorage.getItem("isLogin"));
            this.props.history.push("/");
        })
        .catch((error) => console.warn(error))
        if (this.props.isLoading === false) {
            this.props.setModal(false);
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <Modal {...this.props} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Masuk
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(event) => this.handleLogin(event)}>
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


export default connect("email, password, isLoading, corsHeroku", actions)(withRouter(Login));