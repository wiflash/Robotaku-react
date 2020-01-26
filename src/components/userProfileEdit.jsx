import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {ListGroup, Card, Row, Col, Form, Button} from "react-bootstrap";


class UserProfileEdit extends Component {
    render() {
        const showAllProvinces = store.getState().provinceList.map(province => {
            return (
                <option value={province.id}
                    label={province.nama}
                    onClick={(event) => this.props.handleSetAddress(event, true)}
                >
                    {province.nama}
                </option>
            );
        });

        const showAllCities = store.getState().cityList.map(city => {
            return (
                <option value={city.id}
                    label={city.nama}
                    onClick={(event) => this.props.handleSetAddress(event, false)}
                >
                    {city.nama}
                </option>
            );
        });

        return (
            <Card>
                <Card.Header className="bg-warning">
                    <Card.Title className="m-0 font-weight-bold">
                        <Row className="align-items-center">
                            <Col>
                                SUNTING PROFIL
                            </Col>
                        </Row>
                    </Card.Title>
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Form onSubmit={this.props.handleProfileEdit} noValidate validated={this.props.isValidated}>
                            <Form.Row>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Nama Depan</Form.Label>
                                    <Form.Control name="firstName"
                                        value={this.props.firstName}
                                        onChange={this.props.handleSetGlobal}
                                        required/>
                                </Form.Group>
                                <Form.Group as={Col} md="6">
                                    <Form.Label>Nama Belakang</Form.Label>
                                    <Form.Control name="lastName"
                                        value={this.props.lastName}
                                        onChange={this.props.handleSetGlobal}
                                        required/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group>
                                <Form.Label>Alamat Email</Form.Label>
                                <Form.Control name="email" type="email"
                                    value={this.props.email}
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
                            <Form.Group>
                                <Form.Label>Nomor telepon</Form.Label>
                                <Form.Control name="phone"
                                    placeholder="08xxxxxxxxxx"
                                    value={this.props.phone}
                                    onChange={this.props.handleSetGlobal}
                                    pattern={this.props.phoneRegex}
                                    required/>
                                <Form.Control.Feedback type="invalid">
                                    Nomor telepon harus sesuai format. Contoh: 081234567890
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control name="address"
                                    value={this.props.address}
                                    onChange={this.props.handleSetGlobal}
                                    required/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Provinsi</Form.Label>
                                <select className="custom-select" required>
                                    {
                                        this.props.isLoadingProvince ?
                                            <option disabled>Pilih provinsi</option>
                                            : showAllProvinces
                                    }
                                </select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Kabupaten / Kota</Form.Label>
                                <select className="custom-select" required>
                                    {
                                        this.props.isLoadingCity ?
                                            <option disabled>Pilih kabupaten / kota</option>
                                            : showAllCities
                                    }
                                </select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Kode Pos</Form.Label>
                                <Form.Control name="postalCode"
                                    value={this.props.postalCode}
                                    onChange={this.props.handleSetGlobal}
                                    required/>
                            </Form.Group>
                            <Button block variant="warning" type="submit">
                                Perbaharui
                            </Button>
                        </Form>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        )
    }
}


export default connect(
        "isLoadingProvince, isLoadingCity, firstName, lastName, province, city, postalCode, address, email, password, confirmPassword, phone, emailRegex, phoneRegex, isEmailExists, isPhoneExists, isValidated",
        actions
    )(withRouter(UserProfileEdit));
