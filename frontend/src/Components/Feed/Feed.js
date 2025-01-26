
import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Feed.module.css";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/feedPost")
      .then((success) => {
        console.log(success.data.posts)
        setPosts(success.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <>
      <main className={style.main}>
        <div className="container">
          <div className={`row ${style.feedContainer}`}>
            {posts.map((post) => (
              <div key={post.id} className="col-4 mb-3">
                <div className={style.card}>
                  <img src={post.photoUrl} alt="Post" className={style.cardImage} />
                  <div className={style.cardContent}>
                    <div className={style.meta}>
                      <span className={style.author}>{post.author}</span>
                      <span className={style.date}>{post.date}</span>
                    </div>
                    <h3 className={style.caption}>{post.caption}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>

  );
};

export default Feed;
