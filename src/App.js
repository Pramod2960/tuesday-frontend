import "./App.css";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Board from "./pages/Board";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import UserPage from "./pages/UserPage";
import PageNotFound from "./pages/pageNotFount";

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<UserPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
