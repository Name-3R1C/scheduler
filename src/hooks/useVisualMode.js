import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if(replace) {
      setHistory(prev => {
        const newHistory = [...prev];
        newHistory.pop();
        return [...newHistory, newMode];
      });  
    } else {
      setHistory(prev => [...prev, newMode]);
    }

    setMode(newMode);
  }
  
  function back() {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setMode(newHistory[newHistory.length - 1]);
    }
  }
  
  return { mode, transition, back };
};