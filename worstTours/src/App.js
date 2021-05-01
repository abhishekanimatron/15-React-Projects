import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  // by default loading is true so
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  // function to remove a tour from list
  const removeTour = (id) => {
    //based on id we remove that from the list by filtering
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  // this function is fetching from api
  const fetchTours = async () => {
    setLoading(true);

    try {
      const response = await fetch(url); //the url is above //endpoint
      const tours = await response.json(); //jsonize the response
      setLoading(false); //after getting data we stop loading
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //this runs initially once
  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    //if the data is loading we load the component in loading"
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>No tours remaining.</h2>
          <button className="btn" onClick={fetchTours}>
            Reload tours
          </button>
        </div>
      </main>
    );
  }
  // else we display our tours component
  return (
    <main>
      {/* tours prop is equal to tours state */}
      {/* removeTour prop sends a removeTour function */}
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
