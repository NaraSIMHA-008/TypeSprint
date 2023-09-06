import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import OurTeam from "./pages/OurTeam";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/login";
import AboutUs from "./pages/AboutUs";
import Footer from "./Components/Footer";
import Play from "./pages/play";
import { useEffect, useState } from "react";
import Navbar1 from "./Components/navBar1";
import Profile from "./pages/profile";
import HomeBar from "./Components/home1";
import Register from "./pages/signup";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    document.title = "TypeSprint";
    const accessToken = sessionStorage.getItem("accessToken");
    setLoggedIn(accessToken !== null);
  }, []);

  return (
    <div className="App">
      <>
        {loggedIn ? <Navbar /> : <Navbar1 />}
        <Routes>
          {loggedIn ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/play" element={<Play />} />
              <Route path="/Team" element={<OurTeam />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomeBar />} />
            </>
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/Contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
        <Footer />
      </>
    </div>
  );
}
