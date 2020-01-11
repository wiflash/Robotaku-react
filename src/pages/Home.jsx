import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import Navigation from "../components/navbar";


class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Navigation/>
                <h3 className="mt-5 text-center font-weight-bold">Home page</h3>
            </React.Fragment>
        );
    }
}


export default connect(actions)(withRouter(Home));