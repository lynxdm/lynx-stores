import React from "react";
import ErrorMessage from "../components/ErrorMessage";

function Error() {
  return (
    <ErrorMessage
      title={"404 ERROR"}
      link={""}
      redirectmsg={"Visit our homepage"}
    />
  );
}

export default Error;
