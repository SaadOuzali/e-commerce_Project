import "./App.css";
// import CustomerList from "./components/CustomerList";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductList from "./components/ProductList";
import CustomerList from "./components/CustomerList";
import CategoryTemplate from "./components/CategoryTemplate";
import SubCategoryTemplate from "./components/SubCategoryTemplate";
import ProductTemplate from "./components/ProductTemplate";

function App() {
  return (
    <>
      {/* <CustomerList /> */}
      {/* <ProductList /> */}
      <CategoryTemplate />
      {/* <SubCategoryTemplate /> */}
      {/* <ProductTemplate /> */}
      <ToastContainer />
    </>
  );
}

export default App;
