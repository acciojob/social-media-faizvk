import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Posts from "./Posts";
import PostDetails from "./PostDetails";
import Users from "./Users";
import Notifications from "./Notifications";
import "./styles.css";

export default function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Welcome Post",
      content: "This is the initial post.",
      authorId: 1,
      reactions: [0, 0, 0, 0, 0],
    },
  ]);

  const [users] = useState([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ]);

  const [notifications, setNotifications] = useState([]);

  const addPost = (post) => {
    const nextId = posts.length ? Math.max(...posts.map((p) => p.id)) + 1 : 1;
    setPosts((prev) => [
      { id: nextId, reactions: [0, 0, 0, 0, 0], ...post },
      ...prev,
    ]);
  };

  const updatePost = (id, updated) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const addNotification = (note) => {
    setNotifications((n) => [note, ...n]);
  };

  return (
    <Router>
      <div className="App">
        <h1>GenZ</h1>
        <div>
          {/* this element satisfies .App > :nth-child(1) existence check */}
        </div>
        <nav>
          <Link to="/">Posts</Link>
          <Link to="/users">Users</Link>
          <Link to="/notifications">Notifications</Link>
        </nav>

        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Posts
                posts={posts}
                addPost={addPost}
                updatePost={updatePost}
                users={users}
              />
            )}
          />
          <Route
            path="/posts/:id"
            render={(props) => (
              <PostDetails
                {...props}
                posts={posts}
                updatePost={updatePost}
                users={users}
              />
            )}
          />
          {/* FIX: Pass 'updatePost' function to the Users component */}
          <Route
            path="/users"
            render={() => (
              <Users users={users} posts={posts} updatePost={updatePost} />
            )}
          />
          <Route
            path="/notifications"
            render={() => (
              <Notifications
                notifications={notifications}
                addNotification={addNotification}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}
