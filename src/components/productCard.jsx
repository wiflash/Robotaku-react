import React, {Component, Fragment} from "react";
import {Image, Row, Col, Button, Card, InputGroup} from "react-bootstrap";
import manipulator from "../images/manipulator.jpg";


class ProductCard extends Component {
    state = {
        quantity: 1,
        productId: 1
    };

    render() {
        return (
            <Fragment>
                <Col xs="2" md="4">
                    <Card>
                        <Card.Img as={Image} fluid variant="top" src={manipulator} />
                        <Card.Body>
                            <Card.Title>Product name</Card.Title>
                            <Card.Text>
                                <p>Kode produk:</p>
                                <p>rating</p>
                                <p>Harga</p>
                            </Card.Text>
                            <Row>
                                <Col xs="12" md="6">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <Button variant="light">-</Button>
                                        </InputGroup.Prepend>
                                        {this.state.quantity}
                                        <InputGroup.Prepend>
                                            <Button variant="light">+</Button>
                                        </InputGroup.Prepend>
                                    </InputGroup>
                                </Col>
                                <Col xs="12" md="6">
                                    <Button variant="warning">Tambah</Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Fragment>
        )
    }
}


export default ProductCard;