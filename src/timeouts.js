import { varieties } from "./data";

export const dayCounter = (day, setDay) => {
  setDay(day + 1);
};

export const fillGermination = (germinationRoom, setGerminationRoom) => {
  return setInterval(() => {
    const newGerminationRoom = [...germinationRoom];
    if (newGerminationRoom.length > 30) {
      const lostPlant = newGerminationRoom.shift();
    }
    newGerminationRoom.push(randomVariety());
    setGerminationRoom(newGerminationRoom);
  }, 3000);
};

const randomVariety = () => {
  return varieties[Math.floor(Math.random() * varieties.length)];
};

export const cyclePonds = (ponds, setPonds, transplanting) => {
  setInterval(() => {
    const newPonds = [...ponds];
    newPonds.forEach((pond) => {
      const raft = transplanting.rafts.pop();
      pond.rafts.unshift(raft);
      pond.rafts.pop();
    });
    setPonds(newPonds);
  }, 3000);
};

export const startGameLoop = (gameLoop) => {
  return setInterval(gameLoop, 3000);
};
