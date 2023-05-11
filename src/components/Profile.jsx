import { useGlobal } from "../context/AppContext";

export default function Profile() {
  const { user } = useGlobal();

  return (
    <div>
      <div className=" min-h-[160px]  ">
        <div
          style={{ backgroundImage: ` url(${user?.coverURL})` }}
          className={`flex justify-between bg-cover h-64 bg-center  `}
        >
          <h2 className=" p-6 font-semibold text-2xl text-light-h dark:text-white">
            My Profile
          </h2>
        </div>
      </div>
      <div className="flex flex-col text-center justify-between -mt-6 border-b border-gray-600 text-light-p dark:text-dark-p">
        <div className=" w-16 h-16 rounded-full mx-auto overflow-hidden border ">
          <img src={user?.photoURL} alt="" className="h-16 object-cover" />
        </div>
        <p className="my-4 font-bold">{user?.userName}</p>
      </div>
      <div className="p-4 text-light-p dark:text-dark-p">
        <p className="flex items-end mb-2">
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
          <span className="mr-4"></span> {user?.userName}
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
