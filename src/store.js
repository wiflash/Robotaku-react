import createStore from "unistore";
import Axios from "axios";


const initialState = {
    userData: {},
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    filterProduct: "",
    keyword: "",
    category: "Semua Kategori",
    productPage: 1,
    productPerPage: 12,
    minPrice: 0,
    maxPrice: 9999999999,
    rating: 0,
    totalEntry: 0,
    searchResult: [],
    categories: [
        "Semua Kategori",
        "Aktuator & Power System",
        "Baterai / Charger",
        "Komponen & Peralatan",
        "Robotik & Kit",
        "UAV / Drone",
        "UGV /RC Car"
    ],
    modalShow: false,
    isLoading: true,
    isLoadingShipment: true,
    isLoadingTransaction: true,
    isLogin: false,
    emailRegex: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
    newEmailRegex: "",
    isValidated: false,
    isEmailExists: false,
    existedEmail: "",
    isPhoneExists: false,
    existedPhone: "",
    productId: 1,
    cartItems: [],
    shipmentDetails: {},
    shipmentMethod: {id: 1, price: 18000},
    paymentMethod: {id: 1, price: 100},
    transactionLists: [],
    transactionStatus: ""
};

export const store = createStore(initialState);

export const actions = store => ({
    categoryToPathGlobal: (state, category) => {
        const categoryPath = category === "Semua Kategori" ? "all"
            : category === "Aktuator & Power System" ? "actuator"
            : category === "Baterai / Charger" ? "battery"
            : category === "Komponen & Peralatan" ? "component"
            : category === "Robotik & Kit" ? "robotic"
            : category === "UAV / Drone" ? "uav"
            : "ugv"
        store.setState({categoryPath: categoryPath});
    },

    pathToCategoryGlobal: (state, path) => {
        const category = path === "all" ? "Semua Kategori"
            : path ===  "actuator" ? "Aktuator & Power System"
            : path === "battery" ? "Baterai / Charger"
            : path === "component" ? "Komponen & Peralatan"
            : path === "robotic" ?"Robotik & Kit"
            : path === "uav" ? "UAV / Drone"
            : "UGV / RC Car"
        store.setState({category: category});
    },

    handleSetGlobal: (state, event) => {
        store.setState({ [event.target.name]: event.target.value })
    },

    handleNavbarSeachGlobal: (state, event) => {
        event.target.name === undefined ?
            store.setState({ category: event.target.value })
            : store.setState({ [event.target.name]: event.target.value })
        console.log("event name:",event.target.name);
        console.log("event value:",event.target.value);
        console.log("category:",store.getState().category);
        console.log("minPrice:",store.getState().minPrice);
        console.log("maxPrice:",store.getState().maxPrice);
    },

    handleFilterSideBarGlobal: (state, event) => {
        event.target.value === undefined ?
            store.setState({category: event.target.name})
            : store.setState({ [event.target.name]: event.target.value })
        console.log("event name:",event.target.name);
        console.log("event value:",event.target.value);
        console.log("category:",store.getState().category);
        console.log("minPrice:",store.getState().minPrice);
        console.log("maxPrice:",store.getState().maxPrice);
    },

    requestAllProducts: async () => {
        store.setState({isLoading: true});
        const category = store.getState().category === "Semua Kategori" ?
            "" : store.getState().category
        const minPrice = store.getState().minPrice === "" ?
            0 : store.getState().minPrice
        const maxPrice = store.getState().maxPrice === "" ?
            9999999999 : store.getState().maxPrice
        await Axios.get("https://robotaku.xyz/api/product", {
            params: {
                keyword: store.getState().keyword,
                kategori: category,
                lower_price: minPrice,
                upper_price: maxPrice,
                rating: store.getState().rating,
                p: store.getState().productPage,
                rp: store.getState().productPerPage
            }
        })
        .then((response) => {
            store.setState({
                searchResult: response.data.data,
                productPage: response.data.page,
                productPerPage: response.data.per_page,
                totalEntry: response.data.total_entry,
                isLoading: false
            });
        })
        .catch((error) => {
            console.log(error);
            alert("Terdapat kesalahan pada koneksi");
        });
    },

    handleShippingGlobal: (state, event) => {
        const id = event.target.value;
        const price = id === "1" ? 18000
            : id === "2" ? 15000
            : 7000
        store.setState({shipmentMethod: {id: id, price: price}});
    },

    handlePaymentGlobal: (state, event) => {
        const id = event.target.value;
        const price = id === "1" ? 100
            : id === "2" ? 300
            : 200
        store.setState({paymentMethod: {id: id, price: price}});
    },
    
    setModalGlobal: (state, status) => {
        store.setState({modalShow: status});
    },

    setValidatedGlobal: (state, status) => {
        store.setState({isValidated: status});
    },

    handleLoginGlobal: async (state) => {
        await Axios.put("https://robotaku.xyz/api/auth", {
                email: store.getState().email,
                password: store.getState().password
            }
        )
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("isLogin", true);
            localStorage.setItem("admin", response.data.admin);
            store.setState({modalShow: false});
        })
        .catch((error) => {
            console.log(error);
            error.response === undefined ? alert("Terdapat kesalahan pada koneksi")
            : error.response.status === 401 ? alert("Email atau kata sandi salah")
            : alert("Terdapat kesalahan pada koneksi")
        })
    },

    addToCartGlobal: async (state, inputBody) => {
        await Axios.post("https://robotaku.xyz/api/user/cart",
            {
                product_id: inputBody.productId,
                jumlah: inputBody.quantity
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            }
        )
        .then((response) => {
            if(inputBody.isAdd) {alert("Keranjang berhasil diperbaharui");}
            // else {console.log("INI UPDATE CART");}
        })
        .catch((error) => {
            if(error.response.status === 500) {
                alert("Terdapat kesalahan pada koneksi")
            } else if(error.response.status === 400) {
                alert("Anda harus menyelesaikan pembayaran sebelumnya.");
            } else {
                alert("Terdapat kesalahan pada proses verifikasi, silahkan masuk kembali");
                localStorage.removeItem("isLogin");
                localStorage.removeItem("token");
                store.setState({modalShow: true});
            }
        });
    },

    updateShipmentGlobal: async (state) => {
        store.setState({isLoadingShipment: true});
        await Axios.put("https://robotaku.xyz/api/user/shipment",
            {
                shipment_method_id: store.getState().shipmentMethod.id,
                payment_method_id: store.getState().paymentMethod.id
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            }
        )
        .then((response) => {
            // console.log(response.data);
            store.setState({
                shipmentDetails: response.data,
                isLoadingShipment: false
            });
            // console.log(store.getState().shipmentDetails);
        })
        .catch((error) => console.log("ERROR:",error));
    },

    payNowGlobal: async () => {
        store.setState({isLoading: true});
        await Axios.post("https://robotaku.xyz/api/user/shipment",
            {
                shipment_method_id: store.getState().shipmentMethod.id,
                payment_method_id: store.getState().paymentMethod.id
            },
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            }
        )
        .then((response) => {
            console.log(response.data);
            store.setState({isLoading: false});
            alert("Pesanan berhasil dibuat! Silahkan lakukan pembayaran agar barang dapat diproses.");
        })
        .catch((error) => console.log("ERROR:",error));
    }
});
