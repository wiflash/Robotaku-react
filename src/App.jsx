import React, {Component} from "react";
import {store} from "./store";
import { Provider } from "unistore/react";
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import SearchResult from "./pages/SearchResult";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import CurrentTransaction from "./pages/CurrentTransaction";


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
                        <Route exact path="/transaction" component={CurrentTransaction}/>
                        <Route path="/product/detail/:productId" component={ProductDetail}/>
                        <Route path="/:category" component={SearchResult}/>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}


export default App;