import { useRef, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

//https://catchup-blog-website.onrender.com

const POST_CREATE_URL =
  "https://catchup-blog-website.onrender.com/api/v1/createPost";

const CreatePost = () => {
  const [btitle, setBtitle] = useState("");
  const [bdesc, setBdesc] = useState("");
  const [bcat, setBcat] = useState("");
  const [base64img, setBase64img] = useState("");
  const imgRef = useRef();

  const converttoBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handleSubmit = (e) => {
    const toastId = toast.loading("Waiting...");

    const formDataobj = {
      blog_title: btitle,
      blog_description: bdesc,
      blog_category: bcat,
      blog_image: base64img,
    };

    axios
      .post(POST_CREATE_URL, formDataobj)
      .then((res) => {
        if (res.status == 200) {
          console.log("File Updated success");
          setBtitle("");
          setBdesc("");
          setBcat("");
          setBase64img("");
          imgRef.current.value = "";
          toast.dismiss(toastId);
          toast.success("Data Saved");
        }
      })
      .catch((err) => {
        imgRef.current.value = "";
        setBase64img("");
        console.log(err.response.data);
        toast.dismiss(toastId);
        toast.error(err.response.data?.message);
      });

    e.preventDefault();
  };

  const handleFileChange = async (e) => {
    const base64 = await converttoBase64(e.target.files[0]);
    setBase64img(base64);
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
            onChange={(e) => handleFileChange(e)}
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
