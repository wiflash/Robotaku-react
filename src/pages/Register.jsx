import React, {Component, Fragment} from 'react';
import axios from "axios";
import {withRouter, Redirect} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Jumbotron, Container, Form, Col, Button, Row, Alert} from 'react-bootstrap';


class Register extends Component {
    handleRegister = event => {
        event.preventDefault();
        const form = event.currentTarget;
        const isValid = this.props.password !== this.props.confirmPassword ? false : form.checkValidity()
        if (isValid === false) {
            event.stopPropagation();
        } else {
            axios.post("https://robotaku.xyz/api/auth", {
                nama_depan: this.props.firstName,
                nama_belakang: this.props.lastName,
                email: this.props.email,
                password: this.props.password
            })
            .then((response) => {
                store.setState({
                    isEmailExists: false,
                    existedEmail: "",
                    emailRegex: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$'
                })
                alert("Berhasil mendaftarkan akun!");
                this.props.history.push("/");
            })
            .catch((error) => {
                event.persist();
                if (error.response) {
                    if (error.response.data.message === "Email already exists") {
                        store.setState({
                            isEmailExists: true,
                            existedEmail: this.props.email,
                            emailRegex: `^(?!${this.props.email})`+`(${this.props.emailRegex})`
                        });
                    }
                } else {
                    alert("Terdapat kesalahan pada koneksi");
                }
            })
        }
        this.props.setValidatedGlobal(true);
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
                                        placeholder="robo@robotaku.id" value={this.props.email}
                                        onChange={this.props.handleSetGlobal}
                                        pattern={this.props.emailRegex}
                                        required/>
                                    <Form.Control.Feedback type="invalid">
                                        {this.props.isEmailExists ? "Email sudah ada yang memakai" : "Email harus diisi"}
                                    </Form.Control.Feedback>
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
                                            Konfirmasi kata sandi harus sama dengan kata sandi yang dimasukkan
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
    "keyword, category, email, password, confirmPassword, firstName, lastName, isValidated, isEmailExists, existedEmail, emailRegex",
    actions)(withRouter(Register));