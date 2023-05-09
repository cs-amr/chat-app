
export default function ChangePassword() {
  return (
    <div className="bg-dark-bg h-screen flex justify-center items-center">
      <div className=" w-full max-w-md">
        <h1 className="text-dark-text font-semibold text-3xl text-center">
        Change Password
        </h1>
        <div className="bg-orange-500 my-4 w-16 h-16 mx-auto rounded-full "></div>
        <p className="text-dark-text w-fit mx-auto mt-4 mb-8">name nanem </p>
        <form className=" px-4 ">
          <label
            className="block text-dark-text font-semibold mt-4 mb-2"
            htmlFor=""
          >
            Old Password
          </label>
          <input
            className="rounded-[.25rem] w-full block bg-dark-bg-sec text-dark-text font-semibold text-[.875rem]   px-4 py-2 focus:outline-none"
            type="password"
            placeholder="Enter Old Password"
          />
           <label
            className="block text-dark-text font-semibold mt-4 mb-2"
            htmlFor=""
          >
            New Password
          </label>
          <input
            className="rounded-[.25rem] w-full block bg-dark-bg-sec text-dark-text font-semibold text-[.875rem]   px-4 py-2 focus:outline-none"
            type="password"
            placeholder="Enter New Password"
          />
          <label
            className="block text-dark-text font-semibold mt-4 mb-2"
            htmlFor=""
          >
            Confirm New Password
          </label>
          <input
            className="rounded-[.25rem] w-full block bg-dark-bg-sec text-dark-text font-semibold text-[.875rem]  px-4 py-2 focus:outline-none"
            type="password"
            placeholder="Enter Confirm Password"
          />
          <div className="flex gap-4">

          <button className="bg-active rounded-[.25rem] text-white my-8 w-full px-4 p-2">
             Save
          </button>
          <button className="bg-[#414141] rounded-[.25rem] text-white my-8 w-full px-4 p-2">
             Cancel
          </button>
          </div>
        </form>
      </div>
    </div>
  )
}
