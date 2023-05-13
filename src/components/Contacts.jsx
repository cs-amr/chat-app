import { collection, getDocs } from "firebase/firestore";
import ContactLink from "./ContactLink";
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
      <div className="  ">
        <div className=" overflow-hidden ">
          {users &&
            users.map((linkUser, index) => {
              if (linkUser.uid === authUser.uid) return;
              return <ContactLink linkUser={linkUser} key={index} />;
            })}
        </div>
      </div>
    </div>
  );
}
