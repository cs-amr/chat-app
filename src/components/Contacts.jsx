import { collection, getDocs } from "firebase/firestore";
import ChatLink from "./ChatLink";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { useUser } from "../context/AuthContext";

export default function Contacts() {
  const { authUser } = useUser();
  const [users, setUsers] = useState();
  const colRef = collection(db, "users");
  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let users = [];
        snapshot.docs.forEach((doc) => {
          users.push(doc.data());
        });
        setUsers(users);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <div className="overflow-hidden max-h-screen">
      <div>
        <h2 className=" p-6 font-semibold text-2xl text-light-h dark:text-white">
          Contacts
        </h2>
      </div>
      <div className="overflow-scroll  ">
        <div className=" overflow-hidden">
          {users &&
            users.map((user, index) => {
              if (user.uid === authUser.uid) return;
              return <ChatLink user={user} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
}
