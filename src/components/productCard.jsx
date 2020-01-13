import React, {Component, Fragment} from "react";
import {Image, Row, Col, Button, Card, InputGroup} from "react-bootstrap";
import {FiStar} from "react-icons/fi";
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
                        <Card.Img as={Image} className="rounded-top" fluid variant="top" src={manipulator} />
                        <Card.Body className="p-md-2">
                            <Card.Title>Product name</Card.Title>
                            <Card.Text>
                                <span>Kode produk:</span><br/>
                                <span>rating</span><br/>
                                <span className="font-weight-bold">Harga</span><br/>
                            </Card.Text>
                            <Row className="align-items-center">
                                <Col xs="12" md="6">
                                    <InputGroup className="align-items-center">
                                        <InputGroup.Prepend>
                                            <Button variant="outline-warning">-</Button>
                                        </InputGroup.Prepend>
                                        <Button disabled variant="outline-warning rounded-0">
                                            <span className="text-body font-weight-bold">
                                                {this.state.quantity}
                                            </span>
                                        </Button>
                                        <InputGroup.Append>
                                            <Button variant="outline-warning">+</Button>
                                        </InputGroup.Append>
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