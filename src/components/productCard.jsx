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
                <Col xs="12" sm="6" lg="4">
                    <Card>
                        <Card.Img as={Image} fluid variant="top" src={manipulator} />
                        <Card.Body>
                            <Card.Title>Product name</Card.Title>
                            <Card.Text>
                                <span>Kode produk:</span><br/>
                                <span>rating</span><br/>
                                <span>Harga</span><br/>
                            </Card.Text>
                            <Row className="align-items-center">
                                <Col xs="12" md="6">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <Button block variant="outline-warning">-</Button>
                                        </InputGroup.Prepend>
                                        {this.state.quantity}
                                        <InputGroup.Prepend>
                                            <Button block variant="outline-warning">+</Button>
                                        </InputGroup.Prepend>
                                    </InputGroup>
                                </Col>
                                <Col xs="12" md="6">
                                    <Button block variant="warning">Tambah</Button>
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