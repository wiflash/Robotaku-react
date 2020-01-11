import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Jumbotron, Container, Form, Col, Button, Row} from 'react-bootstrap';


class Register extends Component {
    handleRegister = event => {
        const form = event.currentTarget;
        const isValid = this.props.password !== this.props.confirmPassword ? false : form.checkValidity()
        event.preventDefault();
        if (isValid === false) {
            event.stopPropagation();
        } else {
            console.log("REDIRECT");
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
                                        <Form.Control name="firstName" placeholder="Robo"
                                            value={this.props.firstName}
                                            onChange={this.props.handleSetGlobal}
                                            required/>
                                        <Form.Control.Feedback type="invalid">Nama depan harus diisi</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Nama Belakang</Form.Label>
                                        <Form.Control name="lastName" placeholder="Taku"
                                            value={this.props.clastName}
                                            onChange={this.props.handleSetGlobal}
                                            required/>
                                        <Form.Control.Feedback type="invalid">Nama belakang harus diisi</Form.Control.Feedback>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group>
                                    <Form.Label>Alamat Email</Form.Label>
                                    <Form.Control name="email" type="email"
                                        placeholder="robo@robotaku.id"
                                        value={this.props.email}
                                        onChange={this.props.handleSetGlobal}
                                        required/>
                                    <Form.Control.Feedback type="invalid">Email harus diisi</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Kata sandi</Form.Label>
                                        <Form.Control name="password" type="password"
                                            placeholder="Masukkan kata sandi"
                                            value={this.props.password}
                                            onChange={this.props.handleSetGlobal}
                                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                            required/>
                                        <Form.Control.Feedback type="invalid">
                                            Kata sandi harus minimal 8 karakter, terdapat huruf kapital, huruf kecil, angka, dan karakter spesial
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6">
                                        <Form.Label>Konfirmasi kata sandi</Form.Label>
                                        <Form.Control name="confirmPassword" type="password"
                                            placeholder="Konfirmasi kata sandi"
                                            value={this.props.confirmPassword}
                                            onChange={this.props.handleSetGlobal}
                                            pattern={`^${this.props.password}$`}
                                            required/>
                                        <Form.Control.Feedback type="invalid">
                                            Kata sandi harus sama
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


export default connect(
    "keyword, category, email, password, confirmPassword, firstName, lastName, isValidated",
    actions)(withRouter(Register));