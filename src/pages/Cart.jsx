import React, {Component, Fragment} from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, ListGroup, Card, Button} from "react-bootstrap";
import Navigation from "../components/navbar";
import CartItem from "../components/cartItem";
import Shipment from "../components/shipment";


class Cart extends Component {
    componentDidMount = async () => {
        store.setState({isLoading: true});
        await Axios.get("http://localhost:5000/api/user/cart", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        .then((response) => {
            store.setState({
                cartItems: response.data,
                isLoading: false
            });
        })
        .catch((error) => {
            console.log("ERROR:",error);
            if(error.response.status === 500) {
                alert("Terdapat kesalahan pada koneksi")
            } else if(error.response.status === 404) {
                alert("Keranjang belanja kosong, silahkan berbelanja terlebih dahulu");
                this.props.history.push("/all");
            } else {
                localStorage.removeItem("isLogin");
                localStorage.removeItem("token");
                alert("Terdapat kesalahan pada proses verifikasi, silahkan masuk kembali");
                this.props.history.push("/");
                store.setState({modalShow: true});
            }
        });
        // this.props.updateShipment();
    };

    handleRouteSearch(event) {
        event.preventDefault();
        this.props.categoryToPath();
        console.log(store.getState().categoryPath);
        this.props.history.replace(`/${store.getState().categoryPath}`);
    }

    render() {
        const showResult = this.props.cartItems.map((eachResult, key) => {
            return (
                <CartItem
                    productId={eachResult.product_id}
                    productName={eachResult.nama_produk}
                    pricePerItem={eachResult.harga_satuan}
                    productQuantity={eachResult.jumlah}
                    totalPricePerProduct={eachResult.subtotal}
                />
            );
        });

        return (
            <Fragment>
                <Navigation handleSearch={event => this.handleRouteSearch(event)}/>
                <Row className="mx-auto mt-3">
                    <Col xs="12" lg="5" className="ml-auto mb-3">
                        <Shipment/>
                    </Col>
                    <Col xs="12" lg="5" className="mr-auto">
                        {
                            this.props.isLoading ?
                                <p className="text-center font-weight-bold">Loading...</p> 
                                : showResult
                        }
                    </Col>
                </Row>
            </Fragment>
        )
    }
}


export default connect("cartItems, shipmentDetails, isLoading, isLoadingShipment",actions)(withRouter(Cart));