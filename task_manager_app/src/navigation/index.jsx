import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Tasks from "../pages/Tasks";

const Navigation = () => {

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/tasks" element={<Tasks />} />
            </Routes>
           <Footer />
        </BrowserRouter>
    )
}

export default Navigation;