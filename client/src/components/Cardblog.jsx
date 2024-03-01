import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Buffer } from "buffer";
import "../pages/Home.css";

const BASE_URL = "http://localhost:8080/api/v1/getBlog";

const Cardblog = () => {
  const { data, loading, error } = useFetch(BASE_URL);

  console.log(data);
  console.log(loading);
  console.log(error);

  const handleDelete = (id) => {
    console.log(id + "Deleted");
  };

  return (
    <section className="container mt-2">
      <div className="row mb-2">
        {loading && <div>Loading...</div>}
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
                        handleDelete(list._id);
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
                      list.blog_image.contentType
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
    </section>
  );
};

export default Cardblog;
