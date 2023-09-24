import { useEffect, useRef } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { Stopwatch } from './utils/Stopwatch';

function App() {
  const timer = useRef(null);

  useEffect(() => {
    let test1 = new (Stopwatch as any)(timer.current, 2);

    navigator.vibrate([
      100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30,
      100,
    ]);
  }, []);

  return (
    <>
      <div id="center">
        <div ref={timer} className="timer stopwatch"></div>
      </div>
    </>
  );
}

export default App;
