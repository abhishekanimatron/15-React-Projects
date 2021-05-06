import React, { useState } from "react";
import SingleColor from "./SingleColor";

// generates values from values package
import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false); //invalid color value
  const [list, setList] = useState(new Values("#aaa111").all(10)); //color hex values

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setList(colors);
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      <section className="container">
        <h3>ColorMaker</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="#346abc"
            // error then class of error in css
            className={`${error ? "error" : null}`}
          />
          <button className="btn" type="submit">
            Generate
          </button>
        </form>
      </section>
      <section className="colors">
        {/* traverse list and map out a color for each */}
        {list.map((color, index) => {
          return (
            <SingleColor
              key={index}
              {...color}
              index={index}
              hexColor={color.hex}
            />
          );
        })}
      </section>
    </>
  );
}

export default App;
