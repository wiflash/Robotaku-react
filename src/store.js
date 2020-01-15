import createStore from "unistore";
import Axios from "axios";


const initialState = {
    userData: {},
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    category: "Semua Kategori",
    categoryPath: "all",
    keyword: "",
    modalShow: false,
    isLoading: true,
    isLoadingShipment: true,
    isLogin: false,
    emailRegex: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
    newEmailRegex: "",
    isValidated: false,
    isEmailExists: false,
    existedEmail: "",
    isPhoneExists: false,
    existedPhone: "",
    page: 1,
    perPage: 12,
    totalEntry: 0,
    searchResult: [],
    productId: 1,
    categories: [
        "Semua Kategori",
        "Aktuator & Power System",
        "Baterai / Charger",
        "Komponen & Peralatan",
        "Robotik & Kit",
        "UAV / Drone",
        "UGV /RC Car"
    ],
    minPrice: 0,
    maxPrice: 9999999999,
    cartItems: [],
    shipmentDetails: {},
    shipmentMethod: {id: 1, price: 18000},
    paymentMethod: {id: 1, price: 100}
};

export const store = createStore(initialState);

export const actions = store => ({
    handleSetGlobal: (state, event) => {
        event.target.name === undefined ?
            store.setState({ category: event.target.value })
            : store.setState({ [event.target.name]: event.target.value })
    },

    handleShipping: (state, event) => {
        const id = event.target.value;
        const price = id === "1" ? 18000
            : id === "2" ? 15000
            : 7000
        store.setState({shipmentMethod: {id: id, price: price}});
    },

    handlePayment: (state, event) => {
        const id = event.target.value;
        const price = id === "1" ? 100
            : id === "2" ? 300
            : 200
        store.setState({paymentMethod: {id: id, price: price}});
    },
    
    setModal: (state, status) => {
        store.setState({modalShow: status});
    },

    setValidated: (state, status) => {
        store.setState({isValidated: status});
    },

    categoryToPath: (state, category=store.getState().category) => {
        const categoryPath = category === "Semua Kategori" ? "all"
            : category === "Aktuator & Power System" ? "actuator"
            : category === "Baterai / Charger" ? "battery"
            : category === "Komponen & Peralatan" ? "component"
            : category === "Robotik & Kit" ? "robotic"
            : category === "UAV / Drone" ? "uav"
            : "ugv"
        store.setState({categoryPath: categoryPath});
    },

    pathToCategory: (state, path) => {
        const category = path === "all" ? "Semua Kategori"
            : path ===  "actuator" ? "Aktuator & Power System"
            : path === "battery" ? "Baterai / Charger"
            : path === "component" ? "Komponen & Peralatan"
            : path === "robotic" ?"Robotik & Kit"
            : path === "uav" ? "UAV / Drone"
            : "UGV / RC Car"
        store.setState({category: category});
    },

    addToCart: async (state, inputBody) => {
        await Axios.post("http://localhost:5000/api/user/cart",
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
            alert("Berhasil ditambahkan ke keranjang");
        })
        .catch((error) => {
            if(error.response.status === 500) {
                alert("Terdapat kesalahan pada koneksi")
            } else {
                alert("Terdapat kesalahan pada proses verifikasi, silahkan masuk kembali");
                localStorage.removeItem("isLogin");
                localStorage.removeItem("token");
                store.setState({modalShow: true});
            }
        });
    },

    updateShipment: (state) => {
        store.setState({isLoadingShipment: true});
        Axios.put("http://localhost:5000/api/user/shipment",
            {
                shipment_method_id: 1,
                payment_method_id: 1
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
            console.log(store.getState().shipmentDetails);
        })
        .catch((error) => console.log("ERROR:",error));
    }
});