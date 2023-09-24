import { useEffect, useRef } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { Stopwatch } from './utils/Stopwatch';

function App() {
  const timer = useRef(null);

  useEffect(() => {
    new (Stopwatch as any)(timer.current, {});

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
