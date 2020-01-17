import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {Container, Row, Col, Nav, Button, Tab, Tabs, Card} from "react-bootstrap";


class TransactionCard extends Component {
    render() {
        return (
            <Card>
                <Card.Header>
                    {this.props.status}
                    <small>Terakhir diperbaharui: {this.props.updatedAt}</small>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    {this.props.totalPrice}
                </Card.Footer>
            </Card>
        )
    }
}


export default connect("", actions)(withRouter(TransactionCard));
