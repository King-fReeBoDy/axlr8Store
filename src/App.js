import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SharedLayout from "./Components/SharedLayout";
import Main from "./Components/Main";
import AboutUS from "./Pages/AboutUS";
import ContactUs from "./Pages/ContactUs";
import ErrorPage from "./Pages/ErrorPage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import SingleProduct from "./Pages/SingleProduct";
import FAQ from "./Pages/FAQ";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import SingleCategory from "./Pages/SingleCategory";
import AuthContext from "./Context/DataContext";
import Wishlist from "./Pages/Wishlist";
import Alert from "./Components/Alert";
import Checkout from "./Pages/Checkout";
import Products from "./Pages/Products";
import BuyNow from "./Pages/BuyNow";
import ScrollToTop from "./Components/ScrollToTop";
import OrderPage from "./Pages/OrderPage";
import Confetti from "./Components/Confetti";
import SearchPage from "./Pages/SearchPage";
import Congrats from "./Components/Congrats";
import Loading from "./Components/Loading";
import ItemsOrderedPage from "./Pages/ItemsOrderedPage";
import CancelledItems from "./Components/CancelledItems";
import PendingItems from "./Components/PendingItems";
import ApprovedItems from "./Components/ApprovedItems";
function App() {
  const { url, products, setProducts, showAlert, loggedInUser } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const getProducts = async () => {
    try {
      const { data } = await axios(`${url}products/`);
      setProducts(data.results);
      setLoading(false);
    } catch (error) {
      showAlert(true, "error", error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getOrderedItems = async () => {
    const { data } = await axios(`${url}orders/${loggedInUser.id}/`);
    setOrders(data.results);
  };

  useEffect(() => {
    getOrderedItems();
  }, []);

  const approveds = orders.filter((order) => order.order_status === "approved");
  const pendings = orders.filter((order) => order.order_status === "pending");
  const cancelled = orders.filter(
    (order) => order.order_status === "cancelled"
  );

  return (
    <div>
      <Alert />
      <ScrollToTop>
        <Confetti />
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              path="/"
              index
              element={<Main products={products} loading={loading} />}
            />
            <Route path="/about" element={<AboutUS />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/products"
              element={<Products products={products} />}
            />

            <Route path="/checkout" element={<Checkout />} />
            <Route path="/buynow/:id" element={<BuyNow />} />
            <Route
              path="/category/:name"
              element={<SingleCategory products={products} />}
            />
            <Route
              path="/category/:name/:id"
              element={<SingleProduct products={products} />}
            />
            <Route
              path="/orderspage"
              element={<ApprovedItems approveds={approveds} />}
            />
            <Route
              path="/pending"
              element={<PendingItems pendings={pendings} />}
            />
            <Route
              path="/cancelled"
              element={<CancelledItems cancelled={cancelled} />}
            />
            <Route path="/searchpage/:name" element={<SearchPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/FAQ" element={<FAQ />} />
            <Route path="/congrats" element={<Congrats />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </ScrollToTop>
    </div>
  );
}

export default App;
