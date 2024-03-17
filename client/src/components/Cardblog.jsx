import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Buffer } from "buffer";
import "../pages/Home.css";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LocalServer = "http://localhost:8080";

const GET_BASE_URL =
  `${LocalServer}/api/v1/getBlog` ||
  "https://catchup-blog-website.onrender.com/api/v1/getBlog";
const DELETE_BASE_URL =
  `${LocalServer}/api/v1/deleteOne/` ||
  "https://catchup-blog-website.onrender.com/api/v1/deleteOne/";

const Cardblog = ({ onDelete }) => {
  const { data, loading, error, reFetch } = useFetch(GET_BASE_URL);

  const handledelete = (id) => {
    const toastId = toast.loading("Waiting...");
    axios
      .delete(`${DELETE_BASE_URL}${id}`)
      .then((res) => {
        toast.success("Deleted...");
        console.log(res);
        toast.dismiss(toastId);
        reFetch();
        onDelete();
      })
      .catch((err) => {
        toast.error("Something wrong!");
        console.log(err);
      });
  };

  return (
    <section className="container mt-2">
      <div className="row mb-2">
        {loading && <div>Loading...</div>}
        {error && <div>Loading...</div>}
        {data &&
          data.map((list) => (
            <div className="col-md-6" key={list._id}>
              <div className="row g-0 rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative custom_card_design">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-info">
                    #{list.blog_category.toUpperCase()}
                  </strong>
                  <h3 className="mb-0">{list.blog_title}</h3>
                  <div className="mb-1 text-muted text-truncate">
                    {list.updatedAt.split("T")[0]}
                  </div>
                  <p className="card-text mb-auto ">
                    {list.blog_description.length > 150
                      ? list.blog_description.substring(0, 150) + "....."
                      : list.blog_description}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Link to={`/blog/details/${list._id}`} className="nav-link">
                      Continue reading
                    </Link>
                    <Link to={`/blog/edit/${list._id}`} className="nav-link">
                      Edit
                    </Link>
                    <Link
                      to="/"
                      onClick={() => {
                        handledelete(list._id);
                      }}
                      className="nav-link"
                    >
                      Delete
                    </Link>
                  </div>
                </div>
                <div className="col-auto d-none d-md-block">
                  <img
                    src={`data:${
                      list.blog_image?.contentType
                    };base64,${Buffer.from(
                      list.blog_image.data?.data,
                      "binary"
                    ).toString("base64")}`}
                    className="img-fluid"
                    alt={list.blog_title}
                    style={{ width: "10vw" }}
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
      <Toaster />
    </section>
  );
};

export default Cardblog;
