import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { SyntheticEvent, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  function handleSubmit(event) {
    event.preventDefault();

    const target = event.target;

    const email = target.email.value;
    const userName = target.userName.value;
    const password = target.password.value;

    if (email.length < 1) {
      setError("Enter An Email");
      return;
    } else if (userName.length < 1) {
      setError("Enter A Username");
      return;
    } else if (password.length < 1) {
      setError("Enter A Password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((credentials) => credentials.user)
      .then((user) => {
        updateProfile(user, {
          displayName: userName,
          photoURL:
            "https://firebasestorage.googleapis.com/v0/b/chat-app-dfe5d.appspot.com/o/user_placeholder.png?alt=media&token=330d4aaf-71a2-44e6-93c6-d99b026ae83e",
        }).then(() => {
          setDoc(doc(db, "users", user.uid), {
            userName,
            uid: user.uid,
            email,
            photoURL:
              "https://firebasestorage.googleapis.com/v0/b/chat-app-dfe5d.appspot.com/o/user_placeholder.png?alt=media&token=330d4aaf-71a2-44e6-93c6-d99b026ae83e",
            coverURL:
              "https://firebasestorage.googleapis.com/v0/b/chat-app-dfe5d.appspot.com/o/cover_placeholder.jpg?alt=media&token=40a2a922-97e4-4608-bd75-f4a03cd213d3",
            chats: [],
          });
        });

        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(
          errorMessage
            .substring(errorMessage.indexOf("/") + 1, errorMessage.indexOf(")"))
            .replace("-", " ")
        );
      });
  }
  return (
    <div className="bg-dark-bg h-screen flex justify-center items-center">
      <div className=" w-full max-w-md">
        <h1 className="text-dark-text font-semibold text-3xl text-center">
          Register Account
        </h1>
        <p className="text-dark-text w-fit mx-auto mt-4 mb-8">
          Get your free account now.{" "}
        </p>
        <form
          className=" px-4 "
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          {error && <h2 className="text-red-500 text-center">{error}</h2>}
          <label
            className="block text-dark-text font-semibold mt-4 mb-2"
            htmlFor=""
          >
            Email
          </label>
          <input
            className={`rounded-[.25rem] w-full block bg-dark-bg-sec text-dark-text font-semibold text-[.875rem]   px-4 py-2 focus:outline-none ${
              error && "border-red-500 border"
            }`}
            type="email"
            name="email"
            placeholder="Enter Email"
          />
          <label
            className="block text-dark-text font-semibold mt-4 mb-2"
            htmlFor=""
          >
            Username
          </label>
          <input
            className={`rounded-[.25rem] w-full block bg-dark-bg-sec text-dark-text font-semibold text-[.875rem]   px-4 py-2 focus:outline-none ${
              error && "border-red-500 border"
            }`}
            type="text"
            name="userName"
            placeholder="Enter Username"
          />
          <label
            className="block text-dark-text font-semibold mt-4 mb-2"
            htmlFor=""
          >
            Password
          </label>
          <input
            className={`rounded-[.25rem] w-full block bg-dark-bg-sec text-dark-text font-semibold text-[.875rem]  px-4 py-2 focus:outline-none ${
              error && "border-red-500 border"
            }`}
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          <button className="bg-active rounded-[.25rem] text-white my-8 w-full px-4 p-2">
            Register
          </button>
          <p className="text-dark-text w-fit mx-auto">
            Already have an account ?{" "}
            <Link to="/login" className="font-bold underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
