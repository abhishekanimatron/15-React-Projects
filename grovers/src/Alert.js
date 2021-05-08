import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(timeout);
  }, [list]); //reacts to changes in list and clears the alert after sometime

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
