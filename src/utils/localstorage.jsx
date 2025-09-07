import ProductArray from "./Products";

const Users = JSON.parse(localStorage.getItem("Users")) || [];

// Default CurrentUser structure
const defaultCurrentUser = {
  email: "",
  password: "",
  CartItems: [],
  CheckedOutProducts: [],
  DeliveredProducts: []
};

// Save to localStorage
export const SetlocalStorage = async () => {
  const products = await ProductArray();
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("CurrentUser", JSON.stringify(defaultCurrentUser));
  localStorage.setItem("Users", JSON.stringify(Users || []));
};

// Get from localStorage
export const GetlocalStorage = () => {
  try {
    const products = JSON.parse(localStorage.getItem("products"));
    const users = JSON.parse(localStorage.getItem("Users")) || [];
    const currentUser =
      JSON.parse(localStorage.getItem("CurrentUser")) || defaultCurrentUser;
    return { products, users, currentUser };
  } catch (error) {
    console.error("Error parsing localStorage data:", error);
    return { products: [], users: [], currentUser: defaultCurrentUser };
  }
};
