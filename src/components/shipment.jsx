import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, ListGroup, Card, Button} from "react-bootstrap";


class Shipment extends Component {
    state = {
        toggleRender: this.props.status
    };

    componentDidMount = async () => {
        await this.props.updateShipment();
    };

    render() {
        const showAddress = () => {
            if (this.props.isLoadingShipment === false) {
                return (
                    <Fragment>
                        <span className="text-body">{this.props.shipmentDetails.alamat_lengkap.alamat}, </span>
                        <span className="text-body">Kota {this.props.shipmentDetails.alamat_lengkap.kota}</span><br/>
                        <span className="text-body">{this.props.shipmentDetails.alamat_lengkap.provinsi} </span>
                        <span className="text-body">{this.props.shipmentDetails.alamat_lengkap.kode_pos}</span>
                    </Fragment>
                )
            } else {
                return (
                    <p className="text-body">Loading...</p>
                )
            }
        };

        const selectShippingMethod = [
            "JENI Yosh", "SangKodong Sehari", "Wahaha Reguler"
        ].map((shipping, index) => {
            return (
                <option value={index+1} onClick={this.props.handleShipping}>
                    {shipping}
                </option>
            )
        });

        const selectPaymentMethod = [
            "BINI", "BACA", "MANDORI"
        ].map((payment, index) => {
            return (
                <option value={index+1} onClick={this.props.handlePayment}>
                    {payment}
                </option>
            )
        });

        return (
            <Card>
                <Card.Header className="bg-warning">
                    <Card.Title className="m-0 font-weight-bold">CHECKOUT</Card.Title>
                </Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <span className="font-weight-bold">Alamat</span><br/>
                        {showAddress()}
                    </ListGroup.Item>
                    <ListGroup.Item className="font-weight-bold d-flex justify-content-between">
                        <span>Total Harga ({this.props.shipmentDetails.total_product} barang)</span><br/>
                        <span className="ml-auto">Rp {this.props.shipmentDetails.total_harga}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="d-flex justify-content-between">
                            <span className="font-weight-bold">Metode Pembayaran</span><br/>
                            <span className="ml-auto">+ Rp {this.props.paymentMethod.price}</span><br/>
                        </div>
                        <select className="custom-select" style={{maxWidth: "12rem"}}>
                            {selectPaymentMethod}
                        </select>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="d-flex justify-content-between">
                            <span className="font-weight-bold">Pengiriman</span><br/>
                            <span className="ml-auto">+ Rp {this.props.shipmentMethod.price}</span><br/>
                        </div>
                        <select className="custom-select" style={{maxWidth: "12rem"}}>
                            {selectShippingMethod}
                        </select>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className="d-flex justify-content-between">
                            <span className="font-weight-bold">Total</span><br/>
                            <span className="ml-auto">
                                Rp {this.props.shipmentDetails.total_harga + this.props.paymentMethod.price + this.props.shipmentMethod.price}
                            </span><br/>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
                <Card.Footer>
                        <Button block onClick={()=>this.props.payNow()} variant="warning">Bayar Sekarang</Button>
                </Card.Footer>
            </Card>
        )
    }
}


export default connect("shipmentDetails, isLoadingShipment, shipmentMethod, paymentMethod", actions)(withRouter(Shipment));
