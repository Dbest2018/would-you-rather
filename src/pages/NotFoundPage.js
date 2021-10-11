import React from "react";
import Notfound from "../components/404";

const NotFoundPage = () => {
  return (
    <div className="notfoundpage">
      <Notfound label="The resource you are looking for was not found" />
    </div>
  );
};

export default NotFoundPage;
