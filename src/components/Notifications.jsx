import { useState, useEffect } from "react";
import { db } from "../firebase/Firebase"; // Import Firebase config
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { Bell } from "lucide-react"; // Icon library

const Notifications = ({ userId }) => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (!userId) return;
    const q = query(collection(db, "notifications"), where("userId", "==", userId));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(notifs);
    });

    return () => unsubscribe();
  }, [userId]);

  const markAsRead = async (id) => {
    const notifRef = doc(db, "notifications", id);
    await updateDoc(notifRef, { readStatus: true });
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        <Bell className="w-6 h-6" />
        {notifications.some(n => !n.readStatus) && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {notifications.filter(n => !n.readStatus).length}
          </span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg p-3 rounded-md">
          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications</p>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`p-2 text-sm cursor-pointer ${notif.readStatus ? "text-gray-500" : "font-bold text-black"}`}
              >
                {notif.message}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;
