import { useNavigate, useRouteError } from "react-router-dom";
import { FaCircleArrowRight } from "react-icons/fa6";

const ErrorPage = () => {
    const navigate = useNavigate();

    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Something went wrong!</h1>
            <div className="error-text">
                <p>Sorry, an unexpected error has occurred:</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
            <button onClick={() => navigate('/boards')}>Go Home <FaCircleArrowRight /></button>
        </div>
    );
}

export default ErrorPage;