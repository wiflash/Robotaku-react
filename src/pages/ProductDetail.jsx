import React, {Component, Fragment} from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, CardGroup, InputGroup, Accordion, Card, Button} from "react-bootstrap";
import SlideShow from "../components/carousel";
import Navigation from "../components/navbar";


class ProductDetail extends Component {
    state = {
        detail: {},
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
        store.setState({isLoading: true});
        await Axios.get("http://localhost:5000/api/product/"+productId)
        .then((response) => {
            store.setState({isLoading: false});
            this.setState({
                detail: response.data
            });
        })
        .catch((error) => {
            console.log(error);
            alert("Terdapat kesalahan pada koneksi");
        })
        // console.log(this.state.detail);
    }
    
    componentDidMount = () => {
        this.requestDetailProduct();
    };

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
                                        {this.state.detail.nama}
                                        <Row className="align-items-center">
                                            <Col xs="6">
                                                <small>Rating: {this.state.detail.rating}</small>
                                            </Col>
                                            <Col xs="6">
                                                <small>Kode Produk: 90{this.state.detail.id}89{this.state.detail.id}291{this.state.detail.id}</small><br/>
                                            </Col>
                                        </Row>
                                    </Card.Title>
                                    <Card.Text>
                                        <span className="font-weight-bold">Rp {this.state.detail.harga}</span><br/>
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
                                            <Button block variant="warning">Tambah ke Keranjang</Button>
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


export default connect("productId", actions)(withRouter(ProductDetail));