import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Jumbotron, Container, Form, Col, Button, Row} from 'react-bootstrap';


class Register extends Component {
    handleRegister = event => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.props.setValidated(true);
    };

    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <Row className="align-items-center">
                        <Col xs="12" md="6" className="ml-auto">
                            <Form noValidate validated={this.props.isValidated} onSubmit={this.handleRegister}>
                                <Form.Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Nama Depan</Form.Label>
                                        <Form.Control name="firstName" placeholder="Robo" required/>
                                        <Form.Control.Feedback type="invalid">Nama depan harus diisi</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Nama Belakang</Form.Label>
                                        <Form.Control name="lastName" placeholder="Taku" required/>
                                        <Form.Control.Feedback type="invalid">Nama belakang harus diisi</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group>
                                    <Form.Label>Alamat Email</Form.Label>
                                    <Form.Control name="email" type="email" placeholder="robo@robotaku.id" required/>
                                    <Form.Control.Feedback type="invalid">Email harus diisi</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Kata sandi</Form.Label>
                                        <Form.Control name="password" type="password"
                                            placeholder="Masukkan password" required/>
                                        <Form.Control.Feedback type="invalid">
                                            Kata sandi harus minimal 8 karakter, terdapat huruf kapital, angka, dan karakter spesial
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Konfirmasi kata sandi</Form.Label>
                                        <Form.Control name="confirmPassword" type="password"
                                            placeholder="Masukkan konfirmasi password" required/>
                                        <Form.Control.Feedback type="invalid">
                                            Kata sandi harus minimal 8 karakter, terdapat huruf kapital, angka, dan karakter spesial
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Button variant="warning" type="submit">
                                    Daftar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        );
    }
}


export default connect("keyword, category, modalShow, isValidated", actions)(withRouter(Register));