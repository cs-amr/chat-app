import { doc, updateDoc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useGlobal } from "../context/AppContext";
import { useUser } from "../context/AuthContext";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export default function Settings() {
  const { user } = useGlobal();
  const nameRef = useRef();
  const [focus, setFocus] = useState(false);
  const userRef = doc(db, "users", user?.uid);
  async function updateUserName() {
    await updateDoc(userRef, {
      userName: nameRef.current.value,
    });
  }
  async function updateCover(e) {
    const date = new Date().getTime();
    const storageRef = ref(storage, `${user.username + date}`);
    await uploadBytesResumable(storageRef, e.target.files[0]).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        console.log(downloadURL);
        await updateDoc(userRef, {
          coverURL: downloadURL,
        });
      });
    });
  }
  async function updatePhoto(e) {
    const date = new Date().getTime();
    const storageRef = ref(storage, `${user.username + date}`);
    await uploadBytesResumable(storageRef, e.target.files[0]).then(() => {
      getDownloadURL(storageRef).then(async (downloadURL) => {
        console.log(downloadURL);
        await updateDoc(userRef, {
          photoURL: downloadURL,
        });
      });
    });
  }
  return (
    <div>
      <div className=" min-h-[160px]  ">
        <div
          style={{ backgroundImage: ` url(${user?.coverURL})` }}
          className={`flex justify-between bg-cover h-64 bg-center  `}
        >
          <h2 className=" p-6 font-semibold text-2xl text-light-h dark:text-white">
            Settings
          </h2>
          <button className=" p-1 my-6 mr-3 h-7 w-7 rounded-full font-semibold text-2xl text-light-h dark:text-white bg-white dark:bg-dark-bg">
            <label htmlFor="coverFile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-pencil-fill mx-auto"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
            </label>
          </button>
          <input
            type="file"
            name="cover"
            id="coverFile"
            className="hidden"
            onChange={(e) => updateCover(e)}
          />
        </div>
      </div>
      <div className="flex flex-col text-center justify-between -mt-6 border-b border-gray-600 text-light-p dark:text-dark-p">
        <div className="relative w-16 h-16 rounded-full mx-auto border">
          <img
            src={user?.photoURL}
            alt=""
            className="border h-16 object-cover  rounded-full"
          />
          <button className="absolute left-10 border-dark-bg-sec shadow top-4 p-1 my-6 mr-3 h-7 w-7 rounded-full font-semibold text-2xl text-light-h dark:text-white bg-gray-200 dark:bg-bg-side">
            <label htmlFor="photoFile">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="m-auto bi bi-camera-fill"
                viewBox="0 0 16 16"
              >
                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
              </svg>
            </label>
          </button>
          <input
            type="file"
            name="photo"
            id="photoFile"
            className="hidden"
            onChange={(e) => updatePhoto(e)}
          />
        </div>
        <p className=" my-4 font-bold">{user?.userName}</p>
      </div>
      <div className="p-4 text-light-p dark:text-dark-p">
        <p className="flex items-end mb-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-person"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />{" "}
            </svg>
          </div>
          <input
            ref={nameRef}
            className=" bg-trasparent  p-1 pl-3 bg-transparent focus:outline-none "
            defaultValue={user?.userName}
            onFocus={() => setFocus(true)}
          />
          {focus ? (
            <button
              onClick={updateUserName}
              className="  left-10 border-dark-bg-sec shadow  top-4 p-1  -mr-8 h-7 rounded font-semibold text-sm text-light-h dark:text-white bg-gray-200 dark:bg-bg-side "
            >
              save
            </button>
          ) : (
            <button
              onClick={() => nameRef.current.focus()}
              className="ml-auto   left-10 border-dark-bg-sec shadow  top-4 p-1  mr-3 h-7 w-7 rounded-full font-semibold text-2xl text-light-h dark:text-white bg-gray-200 dark:bg-bg-side "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                className="bi bi-pencil-fill mx-auto"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>
            </button>
          )}
        </p>
        <p className="flex items-end mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-envelope"
            viewBox="0 0 16 16"
          >
            {" "}
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />{" "}
          </svg>{" "}
          <span className="mr-4"></span> {user?.email}
        </p>
      </div>
    </div>
  );
}
