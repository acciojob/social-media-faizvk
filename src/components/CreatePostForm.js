import React, { useState } from "react";

export default function CreatePostForm({ users, addPost }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(users[0]?.id || 1);
  const [content, setContent] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    addPost({ title, content, authorId: Number(author) });
    setTitle("");
    setContent("");
  };

  return (
    <form className="create-post" onSubmit={onSubmit}>
      <input
        id="postTitle"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        id="postAuthor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      >
        {users.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      <textarea
        id="postContent"
        placeholder="Write your post..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
