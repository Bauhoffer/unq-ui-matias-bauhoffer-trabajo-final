import "../App.css";
import { difficultyService } from "../services/difficultyService";
import { useEffect, useState } from "react";
import Word from "../components/word/Word";

const Home = () => {
  const [word, setWord] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  // useEffect(() => {
  // }, []);

  return (
    <div className="home-container">
      <input
        type="text"
        placeholder="Insert a word"
        value={word}
        onChange={handleInputChange}
      />
      <Word word={word} />
    </div>
  );
};

export default Home;
