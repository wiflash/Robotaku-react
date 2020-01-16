import React, {Component} from "react";
import {store} from "./store";
import { Provider } from "unistore/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import CategoryProduct from "./pages/CategoryProduct";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/register" component={Register}/>
                        <Route exact path="/profile" component={Profile}/>
                        <Route exact path="/cart" component={Cart}/>
                        <Route path="/product/detail/:productId" component={ProductDetail}/>
                        <Route path="/:category" component={CategoryProduct}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}


export default App;