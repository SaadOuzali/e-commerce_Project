import { useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import './App.css'
import AdminLogin from "./components/AdminLogin";
import Dashboard from "./components/Dashboard";
import usercontext from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Pagination from "./components/Pagination";
import AddProduct from "./components/productcomponent/AddProduct";
import AllProducts from "./components/productcomponent/AllProducts";
import EditProduct from "./components/productcomponent/EditProduct";
import Navbar from "./components/user/Navbar";
import Home from "./components/user/Home";
import User from "./components/users/User";
import Barchart from "./statistics/Barchart";
import PieChart from "./statistics/PieChart";
import Orders from "./orders/Orders";
import SingleOrder from "./orders/SingleOrder";
import App_Front from "./Stor_Front/App_Front";
import Registre from "./Stor_Front/componenet/Register";
import Drawer from "./Stor_Front/componenet/Drawers";
import CartShoppingprovider from "./Stor_Front/componenet/contexte/CartShoppingContexte";
// import PrentOfStoreFront from './Stor_Front/componenet/PrentOfStoreFront'
import Test from "./Stor_Front/componenet/contexte/test";
import Parent from "./Stor_Front/componenet/Parent";
import { ColorModeContext, useMode } from "./Stor_Front/them";
import Section from "./Stor_Front/componenet/Section";
import Child from "./Stor_Front/componenet/Child";
import IconSection from "./Stor_Front/componenet/IconSection";

// import Home from './components/Home'
function App() {
  const [theme, colorMode] = useMode();
  const [userdata, setUserdata] = useState({ Data: null, isConnected: false });

  return (
    <usercontext.Provider value={{ userdata, setUserdata }}>
      <ColorModeContext.Provider value={{theme, colorMode}}>
        <CartShoppingprovider>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoute />}>
                {/* 
              Outlet = My Nested Route
              (ex: route: /
                --> Outlet = Home
                --> Result = (
                  <Box sx={{ display: "flex" }}>
                    <CssBaseline />

                    <Bar open={open} setOpen={setOpen} />

                    <AsideBar open={open} setOpen={setOpen} theme={theme} />

                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                      <DrawerHeader theme={theme} />
                      <Home />
                    </Box>
                  </Box>
                )
                
                )
            */}

                <Route path="/" element={<Home />} />
                <Route path="users" element={<User />} />
                {/* <Route path='orders' element={<Orders/>} >
                <Route path='singleorder/:id' element={<SingleOrder/>} />
            </Route> */}
                <Route path="orders" element={<Orders />} />
                <Route path="singleorder/:id" element={<SingleOrder />} />
                <Route path="product" element={<AllProducts />} />
                <Route path="barchart" element={<Barchart />} />
                <Route path="piechart" element={<PieChart />} />
                <Route path="product/edit" element={<EditProduct />} />
              </Route>
              {/* <Route path='/dasboard' element={<Dashboard/>} /> */}
              <Route path="/users/login" element={<AdminLogin />} />
              {/* <Route path='/pagination' element={<Pagination/>} /> */}
              <Route path="/pagination" element={<Pagination />}>
                <Route path="add" element={<AddProduct />} />
              </Route>

              <Route path="/landing_page" element={<App_Front />} />
              <Route path="/registre" element={<Registre />} />
              <Route path="/drawer" element={<Drawer />} />
              {/* <Route path='/landing' element={<Test/>} /> */}
              <Route path="/home" element={<Parent />}>
                <Route path="featured" element={<Child theme={theme} />} />
                <Route path="cat" element={<IconSection theme={theme} />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartShoppingprovider>
      </ColorModeContext.Provider>
    </usercontext.Provider>
  );
}

export default App;
