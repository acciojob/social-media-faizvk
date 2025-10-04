import React, { useState } from "react";

export default function Users({ users, posts }) {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className="users-page">
      <h1>Users</h1>
      <ul>
        {users.map((u) => (
          <li key={u.id} onClick={() => setSelectedUser(u.id)}>
            {u.name}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="user-posts">
          {posts
            .filter((p) => p.authorId === selectedUser)
            .map((p) => (
              <div className="post" key={p.id}>
                <h3>{p.title}</h3>
                <p>{p.content}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
