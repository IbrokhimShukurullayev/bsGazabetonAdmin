import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./components/404/NotFound";
import CreateProduct from "./pages/admin/create-product/CreateProduct";
import ManageProduct from "./pages/admin/manage-product/ManageProduct";
import CreateCategory from "./pages/admin/create-category/CreateCategory";
import ManageCategory from "./pages/admin/manage-category/ManageCategory";
import Auth from "./Auth/Auth";
import Admin from "./pages/admin/Admin";
import Home from "./pages/home/Home";
import Buyurtmalar from "./pages/admin/buyurtmalar/Buyurtmalar";
import CreateVakansiya from "./pages/admin/vakansiyalar/CreateVakansiya";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Auth />}>
          <Route path="/admin" element={<Admin />}>
            <Route path="create-product" element={<CreateProduct />} />
            <Route path="manage-product" element={<ManageProduct />} />
            <Route path="create-category" element={<CreateCategory />} />
            <Route path="manage-category" element={<ManageCategory />} />
            <Route path="buyurtmalar" element={<Buyurtmalar />} />
            <Route path="createVakansiya" element={<CreateVakansiya />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
