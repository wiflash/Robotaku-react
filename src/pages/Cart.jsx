import React, {Component, Fragment} from "react";
import Axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, CardGroup, InputGroup, Accordion, Card, Button} from "react-bootstrap";
import Navigation from "../components/navbar";
import CartItem from "../components/cartItem";


class Cart extends Component {
    state = {
        subTotal: 0
    };

    requestDetailProduct = async () => {
        store.setState({isLoading: true});
        await Axios.get("http://localhost:5000/api/product/"+this.state.productId)
        .then((response) => {
            this.setState({
                productName: response.data.nama,
                pricePerItem: response.data.harga
            })
            store.setState({isLoading: false});
        })
        .catch((error) => {
            console.log(error);
            alert("Terdapat kesalahan pada koneksi");
        })
    };

    requestCurrentCart = async () => {
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
            } else {
                alert("Terdapat kesalahan pada proses verifikasi, silahkan masuk kembali");
                localStorage.removeItem("isLogin");
                localStorage.removeItem("token");
                store.setState({modalShow: true});
            }
        })
    }

    componentDidMount = () => {
        this.requestCurrentCart();
    };

    handleRouteSearch(event) {
        event.preventDefault();
        this.props.categoryToPath();
        console.log(store.getState().categoryPath);
        this.props.history.replace(`/${store.getState().categoryPath}`);
    }

    render() {
        const showResult = this.props.cartItems.map((eachResult, key) => {
            // this.setState({subTotal: this.state.subTotal+eachResult.subtotal});
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
                <Row className="align-items-center mx-auto">
                    {
                        this.props.isLoading ?
                            <p className="text-center font-weight-bold">Loading...</p> 
                            : showResult
                    }
                </Row>
            </Fragment>
        )
    }
}


export default connect("cartItems, isLoading",actions)(withRouter(Cart));