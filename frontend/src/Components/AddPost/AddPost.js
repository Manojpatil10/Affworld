import React, { useState } from "react";
import UploadImg from "../../helpers/UploadImg";
import style from "./AddPost.module.css";
import axios from "axios";

function AddPost() {
  const [caption, setCaption] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const upImgUrl = await UploadImg(file);
    setImgUrl(upImgUrl.secure_url);
  };

  const handleSendPost = async (e) => {
    e.preventDefault();
    if (!caption.trim() && !imgUrl) return;

    axios
      .post(
        "http://localhost:8080/addPost",
        { caption, photoUrl: imgUrl, author, date },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((isPosted) => {
        alert(isPosted.data.message);
        if (isPosted) {
          setCaption("");
          setImgUrl("");
          setAuthor("");
          setDate("");
        }
      })
      .catch((error) => {
        alert(error.response.data.message)
      });
  };

  return (
    <>
      <main className={style.main}>
        <div className={`p-3 w-100 ${style.postForm}`}>
          <h2 className={style.formHeading}>Create New Post</h2>
          <form onSubmit={handleSendPost}>
            <div className={style.inputGroup}>
              <label htmlFor="imageInput">Upload Image</label>
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                className={style.imageInput}
                onChange={handleImageChange}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="caption">Caption</label>
              <input
                type="text"
                id="caption"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                placeholder="Author name..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>

            <div className={style.inputGroup}>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <button
              className={style.postButton}
              type="submit"
              disabled={!caption.trim() && !imgUrl}
            >
              Post Blog
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default AddPost;
