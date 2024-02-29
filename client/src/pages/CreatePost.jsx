import { useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const CreatePost = () => {
  const [btitle, setBtitle] = useState("");
  const [bdesc, setBdesc] = useState("");
  const [bcat, setBcat] = useState("");
  const [bimg, setBimg] = useState("");
  const imgRef = useRef();

  const handleSubmit = (e) => {
    const toastId = toast.loading("Waiting...");
    const formData = new FormData();

    formData.append("blog_title", btitle);
    formData.append("blog_description", bdesc);
    formData.append("blog_category", bcat);
    formData.append("blog_image", bimg);
    axios
      .post("http://localhost:8080/api/v1/createPost", formData)
      .then((res) => {
        if (res.status == 200) {
          console.log("File Updated success");
          setBtitle("");
          setBdesc("");
          setBcat("");
          imgRef.current.value = "";
          toast.dismiss(toastId);
          toast.success("Data Saved");
        }
      })
      .catch((err) => {
        imgRef.current.value = "";
        setBimg("");
        console.log(err.response.data);
        toast.dismiss(toastId);
        toast.error(err.response.data?.message);
      });

    e.preventDefault();
  };
  return (
    <div className="container mt-3">
      <h4>Create Post</h4>
      <form onSubmit={(e) => handleSubmit(e)} encType="multipart/form-data">
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
          <label htmlFor="formFile" className="form-label">
            Blog Image
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            onChange={(e) => setBimg(e.target.files[0])}
            ref={imgRef}
            accept="image/*"
          />
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "#000000", color: "#FFF6E9" }}
          >
            Add Post
            <i className="bi bi-file-plus ms-1"></i>
          </button>
        </div>
        <Toaster />
      </form>
    </div>
  );
};

export default CreatePost;
