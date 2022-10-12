import { Link, useParams } from "react-router-dom";
import { useVerifyUserQuery } from "../../redux/api";

const VerifyEmail = () => {
  const { confirmationCode } = useParams();
  const {
    data: response,
    isSuccess,
    isError,
    error,
  } = useVerifyUserQuery({ confirmationCode });

  return (
    <div className="container-fluid d-flex justify-content-center flex-column">
      <h1 style={{ fontFamily: "cursive" }}>VerifyEmail</h1>

      {isSuccess && (
        <div className="alert alert-success">
          <h3>{response.message}</h3>
          <Link to="/auth" style={{ textDecoration: "none" }}>
            <button className="btn btn-primary btn-lg rounded-pill mt-2">
              Login
            </button>
          </Link>
        </div>
      )}

      {isError && (
        <div className="alert alert-danger">
          <h3>{error.message}</h3>
        </div>
      )}
    </div>
  );
};
export default VerifyEmail;
