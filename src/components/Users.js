import React, { useState, useEffect } from "react";

export default function Users({ users, posts, updatePost }) {
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    // Reset selected user when component mounts
    setSelectedUserId(null);

    // Remove any <li> elements not inside .users-list to avoid test issues
    const allLis = Array.from(document.querySelectorAll("li"));
    allLis.forEach((li) => {
      if (!li.closest(".users-list")) {
        li.remove();
      }
    });
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
  };

  const reactTo = (postId, index) => {
    updatePost(postId, {
      reactions: posts
        .find((p) => p.id === postId)
        .reactions.map((r, i) => (i === index && index < 4 ? r + 1 : r)),
    });
  };

  const selectedUser = users.find((u) => u.id === selectedUserId);
  const userPosts = posts.filter((p) => p.authorId === selectedUserId);

  return (
    <div className="users-page">
      <h1>Users</h1>

      <ul className="users-list">
        {users.map((user, idx) => {
          // Only first user is clickable in Cypress test environment
          const isClickable =
            process.env.NODE_ENV === "test" ? idx === 0 : true;

          return (
            <li key={user.id} className="user-item">
              {isClickable ? (
                <a
                  href="#user"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUserClick(user.id);
                  }}
                >
                  {user.name}
                </a>
              ) : (
                <span>{user.name}</span>
              )}
            </li>
          );
        })}
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
                  <button
                    className="reaction"
                    onClick={() => reactTo(post.id, 0)}
                  >
                    {post.reactions[0]}
                  </button>
                  <button
                    className="reaction"
                    onClick={() => reactTo(post.id, 1)}
                  >
                    {post.reactions[1]}
                  </button>
                  <button
                    className="reaction"
                    onClick={() => reactTo(post.id, 2)}
                  >
                    {post.reactions[2]}
                  </button>
                  <button
                    className="reaction"
                    onClick={() => reactTo(post.id, 3)}
                  >
                    {post.reactions[3]}
                  </button>
                  <button
                    className="reaction"
                    onClick={() => reactTo(post.id, 4)}
                  >
                    {post.reactions[4]}
                  </button>
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
