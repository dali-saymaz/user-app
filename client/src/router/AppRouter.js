import { BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "../pages/details/Details";
import Home from "../pages/home/Home";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import Add from "../pages/user/Add";
import AddProduct from "../pages/product/Add";
import ProductDetails from "../pages/product/Details";
import Navbar from "../components/Navbar";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/detail/:id" element={<Details />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/product/add" element={<AddProduct />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
