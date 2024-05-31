import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./routes/Routes";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute.js";
import "./App.css";
import SignupPage from "./pages/SignupPage";
import Home from "./pages/Home";
import ActivationPage from "./pages/ActivationPage";
import toast, { Toaster } from "react-hot-toast";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import FAQPage from "./pages/FAQPages";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProtectiveRoute from "./ProtectedRoute.js";
import ShopCreatePage from "./pages/ShopCreatePage.jsx";
import SellerActivationPage from "./pages/SellerActivationPage.jsx";
import ShopLoginPage from "./pages/ShopLoginPage.jsx";
import ShopHomePage from "./pages/Shop/ShopHomePage.jsx";
import ShopDashboardPage from "./pages/Shop/ShopDashboardPage.jsx";
import ShopInboxPage from "./pages/Shop/ShopInboxPage.jsx";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.js";
import UserInbox from "./pages/Shop/Chatting/UserInbox.jsx";
import { getAllProducts} from "./redux/actions/product.js";
import {getAllEvents} from "./redux/actions/event.js";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";
import TrackOrderPage from "./pages/TrackOrderPage.jsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";
import ShopPreviewPage from "./pages/ShopPreviewPage.jsx";
import ShopOrderDetails from "./components/Layout/ShopOrderDetails.jsx";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminDashboardUsers from "./pages/AdminDashboardUsers";
import AdminDashboardSellers from "./pages/AdminDashboardSellers";
import AdminDashboardOrders from "./pages/AdminDashboardOrders";
import AdminDashboardProducts from "./pages/AdminDashboardProducts";
import AdminDashboardEvents from "./pages/AdminDashboardEvents";
import AdminDashboardWithdraw from "./pages/AdminDashboardWithdraw";
import axios from "axios";
import { server } from "./server.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import AddProduct from './components/Dashboard/AddProduct.jsx'

const App = () => {

  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    // Store.dispatch(getAllEvents());  
    getStripeApikey()
  }, []);

  return (
    <>

{stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectiveRoute>
                  <PaymentPage />
                </ProtectiveRoute>
              }
            />
          </Routes>
        </Elements>
      )}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/faq" element={<FAQPage />} />
        
        <Route path="/create-shop" element={<ShopCreatePage />} />
        <Route
          path="/shop/activation/:activation_token"
          element={<SellerActivationPage />}
        />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
         <Route
          path="/user/order/:id"
          element={
            <ProtectiveRoute>
              <OrderDetailsPage />
            </ProtectiveRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectiveRoute>
              <ProfilePage /> 
            </ProtectiveRoute>
          }
        />

<Route
          path="/checkout"
          element={
            <ProtectiveRoute>
              <CheckoutPage />
            </ProtectiveRoute>
          }
        />
   <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />
         {/* <Route path="dashboard/add-course" element={<AddProduct/>} /> */}
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
    <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
             <Route
          path="/user/track/order/:id"
          element={
            <ProtectiveRoute>
              <TrackOrderPage />
            </ProtectiveRoute>
          }
        />

                <Route path='/dashboard-messages' element={<ShopInboxPage/>}/>
                <Route path="/inbox" element={<UserInbox/>}/>
                {/* <Route path='/inbox?:id' element={<UserInboxPage/>}/> */}



                 {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-sellers"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardSellers />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-orders"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardOrders />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-products"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardProducts />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-events"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardEvents />
            </ProtectedAdminRoute>
          }
        />
         <Route
          path="/admin-withdraw-request"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardWithdraw />
            </ProtectedAdminRoute>
          }
        />
      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={true}
        toastOptions={{
          duration: 5000,
          style: {
            background: "#000",
            color: "#fff",
            border: "#fff",
          },
        }}
      />
    </>
  );
};

export default App;
