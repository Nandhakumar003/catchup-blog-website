import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useParams, useNavigate, useLocation } from "react-router-dom";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [btitle, setBtitle] = useState("");
  const [bdesc, setBdesc] = useState("");
  const [bcat, setBcat] = useState("");

  console.log("State Value...." + btitle);

  console.log("Start" + id);

  let location = useLocation();

  console.log(location);

  const getUserDate = async () => {
    console.log("UseEffect" + id);
    const toastId = toast.loading("Fetching Data...");
    try {
      const getData = await axios.get(
        `https://catchup-blog-website.onrender.com/api/v1/getfindOneDetail/${id}`
      );

      setBtitle(getData?.data.data.blog_title);
      setBdesc(getData?.data.data.blog_description);
      setBcat(getData?.data.data.blog_category);
      toast.dismiss(toastId);
      toast.success("Data Received");
    } catch (err) {
      console.log(err.response.data);
      toast.dismiss(toastId);
      toast.error(err.response.data?.message);
    }
  };

  useEffect(() => {
    getUserDate();
  }, [id]);

  const handleUpdateSubmit = (e) => {
    console.log("SubmitUpdate" + id);
    const toastId = toast.loading("Waiting...");

    const formUpdateData = {
      blog_title: btitle,
      blog_description: bdesc,
      blog_category: bcat,
    };

    axios
      .patch(
        `https://catchup-blog-website.onrender.com/api/v1/updatePost/${id}`,
        formUpdateData
      )
      .then((res) => {
        if (res.status == 200) {
          console.log("File Updated success");
          toast.dismiss(toastId);
          toast.success("Data Updated");
          getUserDate();
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        toast.dismiss(toastId);
        toast.error(err.response.data?.message);
      });

    e.preventDefault();
  };
  return (
    <div className="container mt-3">
      <h4>Update Post</h4>
      <form
        onSubmit={(e) => handleUpdateSubmit(e)}
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Blog Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder=""
            value={btitle}
            onChange={(e) => setBtitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Blog Description
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={bdesc}
            onChange={(e) => setBdesc(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Select Category
          </label>
          <select
            value={bcat}
            onChange={(e) => setBcat(e.target.value)}
            className="form-select"
            aria-label="Default select example"
          >
            <option>Choose One</option>
            <option value="tech">Tech</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="agriculture">Agriculture</option>
          </select>
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#2E3840", color: "#FFF6E9" }}
          >
            Update Post
            <i className="bi bi-pencil-square ms-1"></i>
          </button>
        </div>
        <Toaster position="top-right" />
      </form>
    </div>
  );
};

export default EditBlog;
