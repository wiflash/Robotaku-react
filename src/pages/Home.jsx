import React, {Component, Fragment} from "react";
import {withRouter} from "react-router-dom";
import {connect} from "unistore/react";
import {actions, store} from "../store";
import Navigation from "../components/navbar";
import SlideShow from "../components/carousel";
import ShopByCategory from "../components/shopByCategory";


class Home extends Component {
    render() {
        return (
            <Fragment>
                <Navigation/>
                <SlideShow/>
                <h3 className="mt-5 text-center font-weight-bold">Home page</h3>
                <ShopByCategory className="mt-5"/>
            </Fragment>
        );
    }
}


export default connect(actions)(withRouter(Home));