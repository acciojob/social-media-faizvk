import React from "react";

export default function Notifications({ notifications, addNotification }) {
  const refresh = () => {
    addNotification({
      id: Date.now(),
      text: `Notification at ${new Date().toLocaleTimeString()}`,
    });
  };

  return (
    <div>
      <h1>Notifications</h1>
      <button className="button" onClick={refresh}>
        Refresh Notifications
      </button>
      <section className="notificationsList">
        {notifications.length === 0
          ? null
          : notifications.map((n) => <div key={n.id}>{n.text}</div>)}
      </section>
    </div>
  );
}
