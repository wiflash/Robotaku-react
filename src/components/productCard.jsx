import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Image, Row, Col, Button, Card, InputGroup, Nav, CardDeck} from "react-bootstrap";
import {FiStar} from "react-icons/fi";
import manipulator from "../images/manipulator.jpg";


class ProductCard extends Component {
    state = {
        quantity: 1,
        productId: this.props.productId,
        isAdd: true
    };

    handleDetail = productId => {
        this.props.history.push("/product/detail/"+`90${productId}1${productId}291${productId}`);
    };

    quantityUpdate = isIncrement => {
        const updatedQuantity = isIncrement ? this.state.quantity+1 : this.state.quantity-1
        this.setState({quantity: updatedQuantity <= 0 ? 1 : updatedQuantity})
    }

    addToCart = () => {
        localStorage.getItem("isLogin") === "true" ?
            this.props.addToCartGlobal(this.state)
            : this.props.setModalGlobal(true)
    }

    render() {
        return (
            <Fragment>
                <Col xs="12" sm="6" lg="4" className="pr-0 pl-3">
                    <CardDeck>
                    <Card className="mb-3">
                        <Card.Img as={Image} className="rounded-top" fluid variant="top" src={manipulator} />
                        <Card.Body>
                            <Card.Title  style={{height: "48px"}}>
                                <Nav.Link className="p-0 text-body" onClick={() => this.handleDetail(this.props.productId)}>
                                    {this.props.productName}
                                </Nav.Link>
                            </Card.Title>
                            <Card.Text>
                                <span>Kode Produk: 90{this.props.productId}1{this.props.productId}291{this.props.productId}</span><br/>
                                <span>Rating: {this.props.productRating}</span><br/>
                                <span className="font-weight-bold">Rp {this.props.productPrice}</span><br/>
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Row className="align-items-center">
                                <Col xs="6">
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <Button onClick={()=>this.quantityUpdate(false)} variant="outline-warning">-</Button>
                                        </InputGroup.Prepend>
                                        <InputGroup.Text variant="outline-warning" className="rounded-0">
                                            <span className="text-body font-weight-bold">
                                                {this.state.quantity}
                                            </span>
                                        </InputGroup.Text>
                                        <InputGroup.Append>
                                            <Button onClick={()=>this.quantityUpdate(true)} variant="outline-warning">+</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                                <Col xs="6">
                                    <Button block onClick={this.addToCart} variant="warning">Tambah</Button>
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                    </CardDeck>
                </Col>
            </Fragment>
        )
    }
}


export default connect("", actions)(withRouter(ProductCard));