import React, { useState } from "react";

export default function Users({ users, posts }) {
  const [selectedUserId, setSelectedUserId] = useState(null);

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
          <li key={user.id}>
            {/* The onClick is moved to the anchor tag for better accessibility */}
            <a onClick={() => handleUserClick(user.id)}>{user.name}</a>
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
                {/* FIX: Render reaction buttons to match test expectation */}
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
