import React, {Component, Fragment} from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, CardGroup, InputGroup, Accordion, Card, Button} from "react-bootstrap";
import {FaShoppingCart} from "react-icons/fa"
import SlideShow from "../components/carousel";
import Navigation from "../components/navbar";


class ProductDetail extends Component {
    state = {
        quantity: 1
    }

    handleRouteSearch(event) {
        event.preventDefault();
        this.props.categoryToPath();
        console.log(store.getState().categoryPath);
        this.props.history.replace(`/${store.getState().categoryPath}`);
    }

    requestDetailProduct = async () => {
        const productId = this.props.match.params.productId;
        this.props.requestDetailProduct(productId);
    }

    componentDidMount = () => {
        this.requestDetailProduct();
    };
    
    quantityUpdate = isIncrement => {
        const updatedQuantity = isIncrement ? this.state.quantity+1 : this.state.quantity-1
        this.setState({quantity: updatedQuantity <= 0 ? 1 : updatedQuantity})
    }
    
    addToCart = () => {
        localStorage.getItem("isLogin") === "true" ?
            this.props.addToCart(this.state)
            : this.props.setModal(true)
    }

    render() {
        return (
            <Fragment>
                <Navigation handleSearch={event => this.handleRouteSearch(event)}/>
                <Container fluid>
                    <Row className="align-items-center my-3">
                        <Col xs="12" md="6">
                            {/* show all picture */}
                            <SlideShow className="mt-3"/>
                        </Col>
                        <Col xs="12" md="6">
                            <Card>
                                <Card.Body>
                                    <Card.Title>
                                        {this.props.productDetail.nama}
                                        <Row className="align-items-center">
                                            <Col xs="6">
                                                <small>Rating: {this.props.productDetail.rating}</small>
                                            </Col>
                                            <Col xs="6">
                                                <small>Kode Produk: 90{this.props.productDetail.id}89{this.props.productDetail.id}291{this.props.productDetail.id}</small><br/>
                                            </Col>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        <span className="font-weight-bold">Rp {this.props.productDetail.harga}</span><br/>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Row className="align-items-center">
                                        <Col xs="12" md="6">
                                            <InputGroup className="align-items-center">
                                                <InputGroup.Prepend>
                                                    <Button onClick={()=>this.quantityUpdate(false)} variant="outline-warning">-</Button>
                                                    {/* <Button variant="outline-warning">-</Button> */}
                                                </InputGroup.Prepend>
                                                <InputGroup.Text variant="outline-warning" className="rounded-0">
                                                    <span className="text-body font-weight-bold">
                                                        {this.state.quantity}
                                                    </span>
                                                </InputGroup.Text>
                                                <InputGroup.Append>
                                                    {/* <Button variant="outline-warning">+</Button> */}
                                                    <Button onClick={()=>this.quantityUpdate(true)} variant="outline-warning">+</Button>
                                                </InputGroup.Append>
                                            </InputGroup>
                                        </Col>
                                        <Col xs="12" md="6">
                                            <Button block variant="warning" onClick={()=>this.addToCart()}>
                                                <FaShoppingCart/>
                                                <span className="ml-2">Tambah ke Keranjang</span>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Fragment>
        )
    }
}


export default connect("productId, productDetail", actions)(withRouter(ProductDetail));