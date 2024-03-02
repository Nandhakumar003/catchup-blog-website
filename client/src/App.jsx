import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import BlogDetails from "./pages/BlogDetails";
import EditBlog from "./pages/EditBlog";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import { DeleteCustomContext } from "./context/DeleteContext";

function App() {
  return (
    <>
      <DeleteCustomContext>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/blog/create" element={<CreatePost />} />
          <Route path="/blog/details/:id" element={<BlogDetails />} />
          <Route path="/blog/edit/:id" element={<EditBlog />} />
        </Routes>
      </DeleteCustomContext>
    </>
  );
}

export default App;
