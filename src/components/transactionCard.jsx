import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import {ListGroup} from "react-bootstrap";


class TransactionCard extends Component {
    render() {
        return (
            <ListGroup.Item>
                {
                    this.props.status === "complete" ? <span className="font-weight-bold text-success">Selesai</span>
                    : this.props.status === "failed" ? <span className="font-weight-bold text-danger">Dibatalkan</span>
                    : <span className="font-weight-bold">Menunggu Konfirmasi</span>
                }
                <br/><small>Diperbaharui: {this.props.updatedAt}</small><br/>
                Tagihan: <span className="font-weight-bold">Rp {this.props.totalPrice}</span>
            </ListGroup.Item>
        )
    }
}


export default connect("", actions)(withRouter(TransactionCard));
