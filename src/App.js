import AddBooks from "./components/AddBooks";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import GetBook from "./components/GetBook";
import Register from "./components/Register";
import Login from "./components/Login";
import Protected from "./components/Protected";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import AddUser from "./components/AddUser";
import GetUser from "./components/GetUser";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/addBooks"
            element={<Protected Component={AddBooks} />}
          />
          <Route path="/" element={<Home />} />
          <Route path="/getBooks" element={<Protected Component={GetBook} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/getUser" element={<GetUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
