import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {ListGroup, Badge} from "react-bootstrap";


class TransactionCard extends Component {
    render() {
        const statusBadge = () => {
            const attribute = this.props.status === "complete" ? {variant: "success", statusText: "Selesai"}
                : this.props.status === "failed" ? {variant: "danger", statusText: "Dibatalkan"}
                : {variant: "secondary", statusText: "Menunggu Konfirmasi"}
            return (
                <h5 className="mb-1">
                    <Badge variant={attribute.variant} className="py-2">{attribute.statusText}</Badge>
                </h5>
            );
        };

        return (
            <ListGroup.Item>
                {statusBadge()}
                <small>Diperbaharui: {this.props.updatedAt}</small><br/>
                Tagihan: <span className="font-weight-bold">Rp {this.props.totalPrice}</span>
            </ListGroup.Item>
        )
    }
}


export default connect("", actions)(withRouter(TransactionCard));
