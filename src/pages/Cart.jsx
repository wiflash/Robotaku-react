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
    requestCart = async () => {
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
                alert("Keranjang belanja kosong, silahkan berbelanja terlebih dahulu.");
                this.props.history.push("/all");
            } else {
                localStorage.removeItem("isLogin");
                localStorage.removeItem("admin");
                localStorage.removeItem("token");
                alert("Terdapat kesalahan pada proses verifikasi, silahkan masuk kembali.");
                this.props.history.push("/");
                store.setState({modalShow: true});
            }
        });
    };

    componentDidMount = () => {
        this.requestCart();
        this.props.updateShipmentGlobal()
    }

    handleSearch = (event) => {
        event.preventDefault();
        this.props.categoryToPathGlobal(store.getState().category);
        this.props.history.push(`/${store.getState().categoryPath}`);
    };

    handleLogin = () => {
        this.props.handleLoginGlobal();
        this.componentDidMount();
    };

    updateCart = async (updated) => {
        console.log("cart to be updated:", updated);
        await this.props.addToCartGlobal(updated);
        this.componentDidMount();
    };

    render() {
        const showResult = this.props.cartItems.map((eachResult, key) => {
            return (
                <CartItem {...this.props}
                    productId={eachResult.product_id}
                    productName={eachResult.nama_produk}
                    pricePerItem={eachResult.harga_satuan}
                    productQuantity={eachResult.jumlah}
                    totalPricePerProduct={eachResult.subtotal}
                    updateCart={this.updateCart}
                />
            );
        });

        return (
            <Fragment>
                <Navigation {...this.props}
                    handleSearch={this.handleSearch}
                    handleLogin={this.handleLogin}
                />
                <Row className="mx-auto mt-3">
                    <Col xs="12" lg="5" className="ml-auto mb-3">
                        <Shipment {...this.props}
                            status={true}
                        />
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