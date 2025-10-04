import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function PostDetails({ match, posts, updatePost, users }) {
  const id = parseInt(match.params.id, 10);
  const post = posts.find((p) => p.id === id);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");

  if (!post) {
    return (
      <div>
        <h1>Post not found</h1>
        <Link to="/" className="btn">
          Back
        </Link>
      </div>
    );
  }

  const save = () => {
    updatePost(post.id, { title, content });
    setEditing(false);
  };

  return (
    <div>
      <div className="post">
        {!editing ? (
          <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>Author: {users.find((u) => u.id === post.authorId)?.name}</p>
            <button className="button" onClick={() => setEditing(true)}>
              Edit
            </button>
            <Link to="/" className="btn">
              Back
            </Link>
          </>
        ) : (
          <>
            <input
              id="postTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              id="postContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div style={{ marginTop: 8 }}>
              <button onClick={() => setEditing(false)}>Cancel</button>
              <button onClick={save}>Save</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
