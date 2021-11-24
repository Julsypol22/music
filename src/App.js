import { useState } from "react";
import Header from "./components/Header";
import Songs from "./components/Songs";
import { songsData } from "./Songs/songsData";

function App() {

  const [filteredResults, setFilteredResults] = useState(songsData);

  return (
    <div className="App">
      <Header  setFilteredResults={setFilteredResults} />
      <Songs filteredResults={filteredResults} />
    </div>
  );
}

export default App;
