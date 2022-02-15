import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import {
  fillGermination,
  cyclePonds,
  dayCounter,
  startGameLoop
} from "./timeouts";
import { Raft, varieties } from "./data";
import { useState } from "react";
import { partition } from "lodash/partition";

const initialPonds = [...Array(3)].map(() => ({
  rafts: [...Array(10).fill(new Raft())]
}));

const initialGerminationRoom = [];

export default function App() {
  const [day, setDay] = useState(0);

  let gameIntervalId;
  const [ponds, setPonds] = useState(initialPonds);
  const [transplanting, setTransplanting] = useState({ rafts: [] });
  const [germinationRoom, setGerminationRoom] = useState(
    initialGerminationRoom
  );

  const gameLoop = () => {
    //dayCounter(day, setDay);
    let newDay = day + 1;
    setDay(newDay);
    console.log("tick");
  };

  const reset = () => {
    clearInterval(gameIntervalId);
    // setDay(0)
    gameIntervalId = startGameLoop(gameLoop);
  };

  const addRaft = () => {
    transplanting.rafts.push(new Raft());
    setTransplanting({ ...transplanting });
  };

  const addThaiBasil = () => {
    let germCopy = germinationRoom;
    germCopy.push(varieties[0]);
    setGerminationRoom(germCopy);
  };

  (function moveToGrowth() {
    let germCopy = germinationRoom;
    let growthArray = [];
    germinationRoom.map((item) => {
      let par = partition(germinationRoom, [
        item.actions.action_type === "move" && item.actions[0].day === day
      ]);
      console.log(par);
      //filter out if day === actions[0].day
      //item.actions.action_type === 'move' && item.actions[0].day === day
    });
  })();

  return (
    <div className="App">
      <div className="container mt-3 mb-5">
        <h1>Greenhouse, Day {day}</h1>
        <button className="btn btn-success ml-5" onClick={reset}>
          Start/Reset
        </button>
      </div>
      <button onClick={addThaiBasil}>Thai Basil</button>
      <h3>Germination</h3>
      <div
        className="border container mb-5"
        style={{ width: "584px", height: "176px" }}
      >
        <div className="row">
          {germinationRoom.map((plant, index) => (
            <div
              className="border border-success m-1"
              key={index}
              style={{ width: "50px", height: "50px" }}
            >
              {plant?.name}
            </div>
          ))}
        </div>
      </div>

      <h3>Transplanting</h3>
      <button onClick={addRaft}>Add Raft</button>
      <div className="border container mb-5">
        <div className="row moveDown">
          {transplanting.rafts.map((raft, j) => (
            <div className="border col" style={{ height: "100px" }} key={j}>
              {raft.used}
            </div>
          ))}
        </div>
      </div>

      <h3>Growth</h3>
      <div className="border container">
        <div className="row">
          {ponds.map((pond, i) => (
            <div className="col">
              <h4>Pond {i + 1}</h4>
              <div>
                {pond.rafts.map((raft, j) => (
                  <div
                    className={`moveDown ${raft != null && "border"}`}
                    style={{ height: "100px" }}
                    key={`${i}-${j}`}
                  >
                    {raft?.used}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
