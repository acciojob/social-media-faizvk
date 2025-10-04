import React, { useState } from "react";

// Note: No 'Link' component is needed here based on test description.
// The test implies clicking the 'li' or 'a' shows posts on the same page.

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
          <li key={user.id} onClick={() => handleUserClick(user.id)}>
            {/* The test selector is 'li > a', so we use an anchor tag here */}
            <a>{user.name}</a>
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
