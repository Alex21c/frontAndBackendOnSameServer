import "./App.css";
import "./Assests/fontAwesomeProIcons/fontAwesomeIcons.css";
import { useEffect, useState } from "react";

function App() {
  async function makeApiReq() {
    try {
      let response = await fetch(
        process.env.REACT_APP_SERVER_URL + "/get-random-fruit-name"
      );
      response = await response.json();
      if (!response.success) {
        throw new Error(response.message);
      }
      setStateFruitName(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    makeApiReq();
  }, []);
  let [stateFruitName, setStateFruitName] = useState("...");
  return (
    <div>
      Random fruit name as fetched from server is{" "}
      <strong className="text-[2rem] text-blue-300">{stateFruitName}</strong>
    </div>
  );
}

export default App;
