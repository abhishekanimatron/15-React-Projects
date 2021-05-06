import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [alert, setAlert] = useState(false);
  const cgi = rgb.join(",");

  const hex = rgbToHex(...rgb);
  const hexValue = `#${hexColor}`;
  // after copying text disappears
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <article
      className={`color ${index > 10 && "color-light"}`}
      style={{ backgroundColor: `rgb(${cgi})` }}
      onClick={() => {
        setAlert(true);
        // copies hex to clipboard
        navigator.clipboard.writeText(hexValue);
      }}
    >
      <p className="percent-value">{weight}%</p>
      <p className="color">{hexValue}</p>
      {alert && <p className="alert">Copied!</p>}
    </article>
  );
};

export default SingleColor;
