import AddBooks from "./components/AddBooks";
import Home from "./components/Home";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/">Home</Link>
        <Link to="/add" style={{ marginLeft: 10 }}>
          AddBooks
        </Link>
        <Link to="/xyz" style={{ marginLeft: 10 }}>
          root
        </Link>
        <Routes>
          <Route path="/add" element={<AddBooks />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
