import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Image, ListGroup, Row, Col, Button, Card, InputGroup, Nav, FormControl} from "react-bootstrap";
import manipulator from "../images/manipulator.jpg";
import Axios from "axios";


class CartItem extends Component {
    state = {
        quantity: this.props.productQuantity,
        productId: this.props.productId,
        isAdd: false
    };

    handleDetail = productId => {
        this.props.history.push("/product/detail/"+`90${productId}1${productId}291${productId}`);
    };

    quantityUpdate = isIncrement => {
        const updatedQuantity = isIncrement ? this.state.quantity+1 : this.state.quantity-1
        this.setState({quantity: updatedQuantity <= 0 ? 1 : updatedQuantity})
    };

    render() {
        return (
            <Row className="align-items-center mx-auto">
                <ListGroup className="mb-3">
                    <ListGroup.Item className="p-0">
                        <Row className="align-items-center mx-auto">
                            <Col xs="4" className="px-0">
                                <Image className="p-1" fluid src={manipulator}/>
                            </Col>
                            <Col xs="8" className="px-0 border-left">
                                <Card className="border-0">
                                    <Card.Body className="p-md-2">
                                        <Card.Title className="m-0">
                                            <Nav.Link className="p-0 text-body" onClick={() => this.handleDetail(this.state.productId)}>
                                                {this.props.productName}
                                            </Nav.Link>
                                        </Card.Title>
                                        <Card.Text>
                                            <small>Kode Produk: 90{this.state.productId}1{this.state.productId}291{this.state.productId}</small><br/>
                                        </Card.Text>
                                        <Card.Text className="m-0"><small>Subtotal:</small></Card.Text>
                                        <Card.Text>
                                            <span className="h4 pl-2 font-weight-bold warning">
                                                {this.props.totalPricePerProduct}
                                            </span>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer className="py-0">
                                        <Row className="mt-3 align-items-center">
                                            <Col xs="12" sm="6">
                                                <InputGroup className="mb-3 align-items-center justify-content-center justify-content-sm-start">
                                                    <InputGroup.Prepend>
                                                        <Button block onClick={()=>this.quantityUpdate(false)} variant="outline-warning">-</Button>
                                                    </InputGroup.Prepend>
                                                    <InputGroup.Text variant="outline-warning" className="rounded-0">
                                                        <span className="text-body font-weight-bold">
                                                            {this.state.quantity}
                                                        </span>
                                                    </InputGroup.Text>
                                                    <InputGroup.Append>
                                                        <Button onClick={() => this.quantityUpdate(true)} variant="outline-warning">+</Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </Col>
                                            <Col xs="12" sm="6">
                                                <Button block className="mb-3" onClick={() => {this.props.updateCart(this.state)}} variant="warning">Perbaharui</Button>
                                            </Col>
                                        </Row>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
            </Row>
        )
    }
}


export default connect("", actions)(withRouter(CartItem));