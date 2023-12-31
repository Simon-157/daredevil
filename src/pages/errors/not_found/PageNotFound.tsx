//libraries
import { useLocation } from "react-router-dom";

//Styles
import errorStyles from "../Errors.module.css";

//components
import { PageNotFoundSvg } from "./PageNotFoundSvg";

const PageNotFound = () => {
  const location = useLocation();
  const arr = location.pathname.split("/");
  return (
    <div className={errorStyles.error__wrapper}>
      <div>
        <PageNotFoundSvg />
        <br />
        <strong>
          sorry, looks like we don't have a <span>{arr[arr.length - 1]} </span>
          page{" "}
        </strong>
      </div>
    </div>
  );
};

export default PageNotFound;