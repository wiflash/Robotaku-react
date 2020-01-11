import createStore from "unistore";


const initialState = {
    isLogin: false,
    category: "all",
    keyword: "",
    isLoading: true,
    modalShow: false
};

export const store = createStore(initialState);

export const actions = store => ({
    handleSetGlobal: (state, event) => {
        event.target.name == null ?
            store.setState({ category: event.target.value })
            : store.setState({ [event.target.name]: event.target.value })
    },
    
    setModal: (state, status) => {
        store.setState({modalShow: status});
    }
});