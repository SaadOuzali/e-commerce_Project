import "./App.css";
// import CustomerList from "./components/CustomerList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductList from "./components/ProductList";
import CustomerList from "./components/CustomerList";
import CategoryTemplate from "./components/CategoryTemplate";
import SubCategoryTemplate from "./components/SubCategoryTemplate";
import ProductTemplate from "./components/ProductTemplate";
import LoginTemplate from "./components/LoginTemplate";
import SignupTemplate from "./components/SignupTemplate";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VerifyEmail from "./components/VerifyEmail";
import FooterTemplate from "./components/FooterTemplate";
import UserInfosTemplate from "./components/UserInfosTemplate";
import UserFavoritesTemplate from "./components/UserFavoritesTemplate";
import UserOrdersTemplate from "./components/UserOrdersTemplate";

function App() {
  return (
    <>
      {/* <CustomerList /> */}
      {/* <ProductList /> */}
      {/* <CategoryTemplate /> */}
      {/* <SubCategoryTemplate /> */}
      {/* <ProductTemplate /> */}
      {/* <LoginTemplate /> */}
      {/* <SignupTemplate /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginTemplate />} />
          <Route path="/signup" element={<SignupTemplate />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/categories" element={<CategoryTemplate />} />
          <Route path="/subcategories" element={<SubCategoryTemplate />} />
          <Route path="/product" element={<ProductTemplate />} />
          <Route path="/email/validation" element={<VerifyEmail />} />
          <Route path="/footer" element={<FooterTemplate />} />
          <Route path="/profile/information" element={<UserInfosTemplate />} />
          <Route
            path="/profile/favorites"
            element={<UserFavoritesTemplate />}
          />
          <Route path="/profile/orders" element={<UserOrdersTemplate />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
