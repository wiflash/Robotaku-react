import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, Nav, Button, Tab, Tabs, Card} from "react-bootstrap";


class TransactionCard extends Component {
    render() {
        return (
            <Card>
                <Card.Header>Status pesanan</Card.Header>
                <Card.Body>
                    <Card.Title>Nama Barang</Card.Title>
                    <Card.Text>
                        With supporting text below as a natural lead-in to additional content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
                <Card.Footer>
                    Harga
                </Card.Footer>
            </Card>
        )
    }
}


export default connect("", actions)(withRouter(TransactionCard));
