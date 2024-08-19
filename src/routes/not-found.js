import { Link, useRouteError } from "react-router-dom";

export default function NotFoundPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div
      id="error-page"
      className="container text-center my-5"
      style={{ padding: "50px" }}
    >
      <h1
        className="display-1"
        style={{
          fontSize: "10rem",
          color: "#008d8a",
        }}
      >
        404
      </h1>
      <p className="lead" style={{ fontSize: "1.5rem" }}>
        Page Not Found
      </p>
      <p style={{ fontSize: "1.5rem" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="btn btn-primary"
        style={{
          backgroundColor: "#008d8a",
          borderColor: "#008d8a",
          fontSize: "1.2rem",
        }}
      >
        Go Back Home
      </Link>
    </div>
  );
}
