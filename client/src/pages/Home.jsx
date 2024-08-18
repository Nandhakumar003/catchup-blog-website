import Cardblog from "../components/Cardblog";
import "./Home.css";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

const BASE_URL =
  "https://catchup-blog-website.onrender.com/api/v1/getlatestOne";
/*const BASE_URL = "http://localhost:8080/api/v1/getlatestOne";*/

const Home = () => {
  const { data, loading, error, reFetch } = useFetch(BASE_URL);

  console.log(data);
  console.log(loading);
  console.log(error);

  const checkStatus = () => {
    console.log("Calling");
    reFetch();
  };

  return (
    <div>
      {data && (
        <div className="p-4 p-md-5 mb-4 rounded text-white custom_top_card">
          <div className="col-md-6 px-0">
            <span
              className="display-4 badge rounded-pill"
              style={{ backgroundColor: "#FF0303", color: "#000000" }}
            >
              Trending
            </span>
            <h1 className="display-4 fst-italic">{data.blog_title}</h1>
            <p className="lead my-3">
              {data.blog_description?.length > 150
                ? data.blog_description.substring(0, 150) + "....."
                : data.blog_description}
            </p>
            <p className="lead mb-0">
              <Link
                to={`/blog/details/${data._id}`}
                className="text-white fw-bold"
              >
                {loading ? "Loading..." : "Continue reading..."}
              </Link>
            </p>
          </div>
        </div>
      )}

      <h2 className="text-center">
        <u>Latest Blog</u>
      </h2>

      <Cardblog onDelete={checkStatus} />
    </div>
  );
};

export default Home;
