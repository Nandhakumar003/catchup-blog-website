import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Buffer } from "buffer";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL =
  "https://catchup-blog-website.onrender.com/api/v1/getfindOneDetail/";
const DELETE_BASE_URL =
  "https://catchup-blog-website.onrender.com/api/v1/deleteOne/";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, loading, error, reFetch } = useFetch(`${BASE_URL}${id}`);

  const handledelete = (id) => {
    const toastId = toast.loading("Waiting...");
    axios
      .delete(`${DELETE_BASE_URL}${id}`)
      .then((res) => {
        toast.success("Deleted...");
        console.log(res);
        toast.dismiss(toastId);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        toast.error("Something wrong!");
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="row mt-4">
        {data && Object.keys(data).length != 0 && (
          <>
            <div className="col-md-4 col-12">
              <img
                src={`data:${data.blog_image?.contentType};base64,${Buffer.from(
                  data.blog_image.data?.data,
                  "binary"
                ).toString("base64")}`}
                className="card-img-top"
                alt="..."
              />
            </div>
            <div className="col-md-8 col-12">
              <div className="card-body">
                <h5 className="card-title">{data.blog_title}</h5>
                <p className="card-text">{data.blog_description}</p>
                <p className="card-text">
                  <small className="text-muted">{data.updatedAt}</small>
                </p>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="d-flex justify-content-evenly">
                <Link to={`/blog/edit/${data._id}`} className="nav-link">
                  Edit
                </Link>
                <Link
                  onClick={() => {
                    handledelete(data._id);
                  }}
                  className="nav-link"
                >
                  Delete
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default BlogDetails;
