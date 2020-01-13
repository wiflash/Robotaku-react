import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Image, Row, Col, Button, Card, InputGroup, Nav} from "react-bootstrap";
import {FiStar} from "react-icons/fi";
import manipulator from "../images/manipulator.jpg";


class ProductCard extends Component {
    state = {
        quantity: 1
    };

    handleDetail = productId => {
        store.setState({productId: productId});
        this.props.history.push("/product/detail/"+this.props.productId);
    }

    render() {
        return (
            <Fragment>
                {/* <Col xs="12" sm="6" lg="4"> */}
                    <Card className="mt-3">
                        <Card.Img as={Image} className="rounded-top" fluid variant="top" src={manipulator} />
                        <Card.Body className="p-md-2">
                            <Card.Title>
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
                        </Card.Footer>
                    </Card>
                {/* </Col> */}
            </Fragment>
        )
    }
}


export default connect("productId", actions)(withRouter(ProductCard));