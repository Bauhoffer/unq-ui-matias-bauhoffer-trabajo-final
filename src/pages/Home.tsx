import "../App.css";
import { difficultyService } from "../services/difficultyService";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const testDifficulties = async () => {
      const difficulties = await difficultyService.getDifficulties();
      console.log("Difficulties:", difficulties);
    };

    testDifficulties();
  }, []);

  return (
    <div className="home-container">
      <p>Esta es mi home</p>
    </div>
  );
};

export default Home;
