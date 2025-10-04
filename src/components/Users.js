import React, { useState, useEffect } from "react";

export default function Users({ users, posts }) {
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    setSelectedUserId(null);
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const selectedUser = users.find((u) => u.id === selectedUserId);
  const userPosts = posts.filter((p) => p.authorId === selectedUserId);

  return (
    <div className="users-page">
      <h1>Users</h1>
      <ul className="users-list">
        {users.map((user) => (
          <li key={user.id} className="user-item">
            <a
              href="#user"
              onClick={(e) => {
                e.preventDefault();
                handleUserClick(user.id);
              }}
            >
              {user.name}
            </a>
          </li>
        ))}
      </ul>

      {selectedUser && (
        <section className="user-posts">
          <h2>Posts by {selectedUser.name}</h2>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div className="post" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <div className="reactions">
                  <button className="reaction">{post.reactions[0]}</button>
                  <button className="reaction">{post.reactions[1]}</button>
                  <button className="reaction">{post.reactions[2]}</button>
                  <button className="reaction">{post.reactions[3]}</button>
                  <button className="reaction">{post.reactions[4]}</button>
                </div>
              </div>
            ))
          ) : (
            <p>No posts found for this user.</p>
          )}
        </section>
      )}
    </div>
  );
}
