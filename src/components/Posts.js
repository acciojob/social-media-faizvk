import React from "react";
import { Link } from "react-router-dom";
import CreatePostForm from "./CreatePostForm";

export default function Posts({ posts, addPost, updatePost, users }) {
  const reactTo = (postId, index) => {
    updatePost(postId, {
      reactions: posts
        .find((p) => p.id === postId)
        .reactions.map((r, i) => (i === index && index < 4 ? r + 1 : r)),
    });
  };

  return (
    <div className="posts-page">
      <CreatePostForm users={users} addPost={addPost} />

      <div className="posts-list">
        <div className="posts-header">Posts Section</div>

        {posts.map((p) => (
          <div className="post" key={p.id}>
            <h2 className="post-title">{p.title}</h2>
            <p className="post-author">
              Author:{" "}
              {users.find((u) => u.id === p.authorId)?.name || "Unknown"}
            </p>
            <p className="post-content">{p.content}</p>
            <div className="reactions">
              <button className="reaction" onClick={() => reactTo(p.id, 0)}>
                {p.reactions[0]}
              </button>
              <button className="reaction" onClick={() => reactTo(p.id, 1)}>
                {p.reactions[1]}
              </button>
              <button className="reaction" onClick={() => reactTo(p.id, 2)}>
                {p.reactions[2]}
              </button>
              <button className="reaction" onClick={() => reactTo(p.id, 3)}>
                {p.reactions[3]}
              </button>
              <button className="reaction" onClick={() => reactTo(p.id, 4)}>
                {p.reactions[4]}
              </button>
            </div>
            <Link to={`/posts/${p.id}`} className="button">
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
