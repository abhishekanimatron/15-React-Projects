import React, { useState } from "react";

const Tour = ({ id, image, name, info, price, removeTour }) => {
  // a state value to toggle read more functionality
  const [readMore, setReadMore] = useState(false); //defaults to false
  return (
    <article className="single-tour">
      <img src={image} alt={name} />
      <footer>
        <div className="tour-info">
          <h4>{name}</h4>
          <h4 className="tour-price">${price}</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 100)}...`}//text to trim if
          not true
          <button onClick={() => setReadMore(!readMore)}>
            //toggle function
            {readMore ? "show Less" : "read more"}//toggles name to the value
          </button>
        </p>
        <button
          className="delete-btn"
          onClick={() => {
            removeTour(id);
          }}
        >
          Not interested
        </button>
      </footer>
    </article>
  );
};

export default Tour;
