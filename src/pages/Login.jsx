import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/AuthContext";

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useUser();
  if (authUser !== null) {
    navigate("/");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const target = event.target;

    const email = target.email.value;
    const password = target.password.value;

    if (email.length < 1) {
      setError("Enter Your Email");
      return;
    } else if (password.length < 1) {
      setError("Enter Your Password");
      return;
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
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
          Welcome Back !
        </h1>
        <p className="text-dark-text w-fit mx-auto mt-4 mb-8">
          Sign in to continue{" "}
        </p>
        <form className=" px-4 " onSubmit={(event) => handleSubmit(event)}>
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
            defaultValue={"john99@gmail.com"}
            placeholder="Enter Your Email"
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
            defaultValue={"johnpassword"}
            placeholder="Enter Your Password"
          />
          <button className="bg-active rounded-[.25rem] text-white my-8 w-full px-4 p-2">
            Log In
          </button>
          <p className="text-dark-text w-fit mx-auto">
            Don't have an account ?{" "}
            <Link to="/register" className="font-bold underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
