import {Link} from "react-router-dom"
export default function ErrorPage() {
  return (
    <div className="text-center mx-auto h-screen dark:bg-dark-bg dark:text-white bg-light-bg text-black">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <Link to="/" className="underline">GO HOME</Link>

    </div>
  )
}
