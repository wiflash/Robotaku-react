import createStore from "unistore";


const initialState = {
    corsHeroku: "https://cors-anywhere.herokuapp.com/",
    userData: {},
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    category: "all",
    keyword: "",
    modalShow: false,
    isLoading: true,
    isLogin: false,
    emailRegex: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
    newEmailRegex: "",
    isValidated: false,
    isEmailExists: false,
    existedEmail: "",
    isPhoneExists: false,
    existedPhone: "",
    perPage: 12
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
    },

    setValidated: (state, status) => {
        store.setState({isValidated: status});
    }
});